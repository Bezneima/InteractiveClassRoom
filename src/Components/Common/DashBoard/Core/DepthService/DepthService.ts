import {RenderedElement} from "../../../../../Store/CanvasStore/types";
import {IObservableArray, toJS} from "mobx";
import {Vector2} from "three";

export const ZIndexDepthStep = 0.1;

// Не уверен что для этого нужен целый сервис, но мне кажется что в дальнейшем с глубиной у меня возникнут целая ебанина,
// Поэтому тут сделаю сервис который будет всей этой хуйней заниматься
// Тут возможно нужно сделать так чтобы была еще zIndex выбираемого, чтобы не менять растановку а давать возможность просто прокликать и что-то поменять у элемента
// Но пока я это в рот ебал делать
class DepthService {
    lastMousePos?: Vector2;
    lastMovedToFrontElem = new Map<RenderedElement, boolean>();

    moveElementToFront(neededElement: RenderedElement, renderedElements: IObservableArray<RenderedElement>) {
        if (neededElement && renderedElements) {
            const inputElementZIndex = neededElement.zIndex;
            let maxZIndex = -1;
            renderedElements.forEach((element) => {
                maxZIndex = Math.max(element.zIndex, maxZIndex);
                if (element.zIndex > inputElementZIndex) {
                    element.zIndex =  element.zIndex - ZIndexDepthStep;
                }
            });
            if (maxZIndex !== -1) {
                neededElement.zIndex = maxZIndex;
            }
        }
    };

    moveFromElementsToFront(mousePos: Vector2, neededElements: Array<RenderedElement>, renderedElements: IObservableArray<RenderedElement>): RenderedElement | undefined {
        if (mousePos.x !== this.lastMousePos?.x || mousePos.y !== this.lastMousePos?.y) {
            this.lastMovedToFrontElem = new Map<RenderedElement, boolean>();
            this.lastMousePos = mousePos;
        }
        let movedToFrontElement: RenderedElement | undefined = undefined;
        let minimumElement: RenderedElement | undefined = undefined;
        neededElements.forEach((element) => {
            if (!this.lastMovedToFrontElem.get(element)) {
                if(movedToFrontElement) {
                    if (movedToFrontElement.zIndex < element.zIndex) {
                        movedToFrontElement = element;
                    }
                } else {
                    movedToFrontElement = element;
                }
            }
            if (!minimumElement) {
                minimumElement = element;
            } else {
                if (minimumElement.zIndex < element.zIndex) {
                    minimumElement = element;
                }
            }
        });
        if (movedToFrontElement) {
            this.lastMovedToFrontElem.set(movedToFrontElement, true);
            this.moveElementToFront(movedToFrontElement, renderedElements);
            return movedToFrontElement;
        } else {
            if (minimumElement) {
                this.lastMovedToFrontElem = new Map<RenderedElement, boolean>([[minimumElement, true]]);
                this.moveElementToFront(minimumElement, renderedElements);
                return minimumElement;
            }
        }
    }

    public getNewMaxDepth(renderedElements: IObservableArray<RenderedElement>): number {
        let maxZIndex = -1;
        renderedElements.forEach((element) => {
            maxZIndex = Math.max(element.zIndex, maxZIndex);
        });
        return maxZIndex === -1 ? 0 : maxZIndex + ZIndexDepthStep;
    }
}

export default new DepthService();

