"use client"

import { ImageProps, Image as DImage, useScroll } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useRef } from "react"
import { Group, MathUtils } from "three"

function DreiImage(props: ImageProps) {
  const ref = useRef(null)
  const group = useRef<Group>(null)
  const data = useScroll()

  useFrame((state, delta) => {
    if (group.current && ref.current && data) {
      group.current.position.z = MathUtils.damp(
        group.current.position.z,
        Math.max(0, data.delta * 100),
        4,
        delta
      )

      //   @ts-ignore
      ref.current.material.grayscale = MathUtils.damp(
        // @ts-ignore
        ref.current.material.grayscale,
        Math.max(0, 1 - data.delta * 1000),
        4,
        delta
      )
    }
  })
  return (
    <group ref={group}>
      <DImage ref={ref} {...props} />
    </group>
  )
}

function Slide({ urls = [""], ...props }) {
  const ref = useRef(null)
  const { width } = useThree((state) => state.viewport)
  const w = width < 10 ? 1.5 / 3 : 1 / 3

  return (
    <group ref={ref} {...props}>
      <DreiImage position={[-width * w, 0, 0]} scale={[5, 7]} url={urls[0]} />
      <DreiImage position={[0, 0, 0]} url={urls[1]} scale={[7, 5]} />
      <DreiImage position={[width * w, 0, 1]} url={urls[2]} scale={[5, 5]} />
    </group>
  )
}

export default function Slides() {
  const { width } = useThree((state) => state.viewport)
  return (
    <>
      <Slide
        position={[0, 0, 0]}
        urls={[
          "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/b711a8cd-8c58-48d8-9a63-274bee121118/width=450/tmpmp2qpsjg.jpeg",
          "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/d127feb2-f261-4a9b-bf6a-a2f8d84d7cee/width=450/image(3).jpeg",
          "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/85833b3e-a1fb-4971-8046-aee330ca6e3f/width=450/306BBCC99F77BB46B54031D32A5C3B7BD9E16D6F64D9523C7CAFD0C054A92EB5.jpeg",
        ]}
      />
      <Slide
        position={[width * 1, 0, 0]}
        urls={[
          "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/4e3161ee-40c3-47c3-a010-b5fac93f259f/width=450/309.jpeg",
          "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/282a57b9-62d1-4c4e-be3a-d7d46e0fc119/width=450/26FC84F5734BA765462C10A0ABD2459C63FF4A77C4B78359ABA585A17F75676F.jpeg",
          "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/e2029929-389f-477a-892b-b38f30a91fb9/width=450/00006-1146122903-1girl,model%20pose,smirk,navel,wide%20hip,curvy,(ulzzang-6500_0.5),_lora_microwaistV05_0.5_,_lora_%E8%A2%81%E7%92%9F%E7%BE%BD-09_0.3_,_lora_skin_tone_slider.jpeg",
        ]}
      />
      <Slide
        position={[width * 2, 0, 0]}
        urls={[
          "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/b711a8cd-8c58-48d8-9a63-274bee121118/width=450/tmpmp2qpsjg.jpeg",
          "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/d127feb2-f261-4a9b-bf6a-a2f8d84d7cee/width=450/image(3).jpeg",
          "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/85833b3e-a1fb-4971-8046-aee330ca6e3f/width=450/306BBCC99F77BB46B54031D32A5C3B7BD9E16D6F64D9523C7CAFD0C054A92EB5.jpeg",
        ]}
      />
    </>
  )
}
