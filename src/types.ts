import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {ReactThreeFiber} from "@react-three/fiber";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            orbitControls: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>
        }
    }
}