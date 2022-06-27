import gsap, {Expo} from "gsap";
import * as THREE from 'three/src/Three'
import { Canvas, useThree} from "@react-three/fiber";
import { OrthographicCamera} from "@react-three/drei";
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";

var vertex = `
    varying vec2 vUv;
    void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
`;

var fragment = `
    varying vec2 vUv;
    uniform sampler2D texture1;
    uniform sampler2D texture2;
    uniform sampler2D disp;
    uniform float dispFactor;
    uniform float effectFactor;
    void main() {
        vec2 uv = vUv;
        vec4 disp = texture2D(disp, uv);
        vec2 distortedPosition1 = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
        vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
        vec4 _texture1 = texture2D(texture1, distortedPosition1);
        vec4 _texture2 = texture2D(texture2, distortedPosition2);
        vec4 finalTexture = mix(_texture1, _texture2, dispFactor);
        gl_FragColor = finalTexture;
}
`;


const Camera = () => {
    const {viewport} = useThree()

    return (
        <OrthographicCamera
            left={viewport.width/-2}
            right={viewport.width/2}
            top={viewport.height/2}
            bottom={viewport.height/-2}
            near={1}
            far={1000}
            position={[0, 0, 1]}
        />
    )
}


const Displacement = forwardRef((props, ref) => {

    const {gl, viewport} = useThree()
    const matRef = useRef(null);
    const [state, setState] = useState({})
    const curIndexRef = useRef(0)
    const nextIndexRef = useRef(1)
    const tweenRef = useRef(null)

    useEffect(()=>{
        tweenRef.current = gsap.timeline()
    },[])

    const matShader = useMemo(() => {
        let loader = new THREE.TextureLoader()

        let textures = props.images.map(img=>loader.load(img))
            textures.forEach(texture => {
            texture.magFilter = THREE.LinearFilter;
            texture.minFilter = THREE.LinearFilter;
            texture.anisotropy = gl.capabilities.getMaxAnisotropy();
        });

        let disp = loader.load(props.displacementImage);
            disp.wrapS = disp.wrapT = THREE.RepeatWrapping;

        let count = props.images.length;
        let speedIn = props.speedIn || 1.6;
        let speedOut = props.speedOut || 1.2;
        curIndexRef.current = props.images.length > props.curIndex ? props.curIndex : 0 || 0
        nextIndexRef.current = ((curIndexRef.current + 1) % count) || 1

        setState({count, speedIn, speedOut, textures})

        return {
            uniforms: {
                effectFactor: { type: "f", value: props.intensity || 1.6 },
                dispFactor: { type: "f", value: 0.0 },
                texture1: { type: "t", value: textures[curIndexRef.current] },
                texture2: { type: "t", value: textures[nextIndexRef.current] },
                disp: { type: "t", value: disp }
            },
    
            vertexShader: vertex,
            fragmentShader: fragment,
            transparent: true,
            opacity: 1.0
        }
    }, [])

    const next = () => {
        nextIndexRef.current = (curIndexRef.current + 1) % state.count;
        matRef.current.uniforms.texture1.value = state.textures[curIndexRef.current]
        matRef.current.uniforms.texture2.value = state.textures[nextIndexRef.current]
        curIndexRef.current = (curIndexRef.current + 1) % state.count;

        matRef.current.uniforms.dispFactor.value = 0;
        tweenRef.current.clear()
        tweenRef.current.to(matRef.current.uniforms.dispFactor,{
            duration: state.speedIn,
            value: 1,
            ease: Expo.easeOut,
        });
        tweenRef.current.progress(0)
    }

    const previous = () => {
        let prevIndex = curIndexRef.current;
        curIndexRef.current = (curIndexRef.current - 1) < 0 ? 2 : curIndexRef.current - 1;
        matRef.current.uniforms.texture1.value = state.textures[curIndexRef.current]
        matRef.current.uniforms.texture2.value = state.textures[prevIndex]
        
        matRef.current.uniforms.dispFactor.value = 1;
        tweenRef.current.clear()
        tweenRef.current.to(matRef.current.uniforms.dispFactor,{
            duration: state.speedOut,
            value: 0,
            ease: Expo.easeOut,
        });
        tweenRef.current.progress(0)
    }
    useImperativeHandle(ref, ()=>({next, previous}))


    return (
        <mesh>
            <planeBufferGeometry name="geometry" args={[viewport.width,viewport.height]}/>
            <shaderMaterial name="material" args={[matShader]} ref={matRef}/>
        </mesh>
    )
})


const WebglCanvas = forwardRef((props, ref) => {
    return (
            <Canvas props={{ antialias: false, stencil: false }}>
                <Camera/>
                <Displacement {...props} ref={ref}/>
            </Canvas>
    )
})


export default WebglCanvas;