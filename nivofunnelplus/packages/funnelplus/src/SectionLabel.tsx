import React from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useTheme, useMotionConfig, Margin } from '@nivo/core'
import { FunnelDatum, FunnelPart } from './types'
import { InheritedColorConfig } from '@nivo/colors';

interface SectionLabelProps<D extends FunnelDatum> {
    part: FunnelPart<D>
    sectionColor: InheritedColorConfig<FunnelPart<D>>
    margin?: Margin
    direction?: string
}

export const SectionLabel = <D extends FunnelDatum>({ 
    part, 
    sectionColor, 
    margin, 
    direction  
}: SectionLabelProps<D>) => {
    const theme = useTheme()
    const { animate, config: motionConfig } = useMotionConfig()

    const animatedProps = useSpring({
        transform: direction == 'vertical' ? `translate(${-(margin?.left || 0)}, ${part.y})` : `translate(${part.x}, ${-(margin?.top || 0)})`,
        color: sectionColor,
        config: motionConfig,
        immediate: !animate,
    })

    return (
        <animated.g transform={animatedProps.transform}>
            <animated.text
                textAnchor = {direction == "vertical" ? "left" : "middle"}
                dominantBaseline = {direction == "vertical" ? "central" : "hanging"}
                style={{
                    ...theme.labels.text,
                    fill: sectionColor.toString(),
                    pointerEvents: 'none',
                }}>
                {part.data.label}
            </animated.text>
        </animated.g>
    )
}