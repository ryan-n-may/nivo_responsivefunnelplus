import React from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useTheme, useMotionConfig, Margin } from '@nivo/core'
import { FunnelDatum, FunnelPart } from './types'


interface PartLabelProps<D extends FunnelDatum> {
    part: FunnelPart<D>
    partIndex: number
    step: {x: number, y: number}
    offset: {x: number, y: number}
    labelFormat?: { (label: string): string }
}

export const PartLabel = <D extends FunnelDatum>({
    part, 
    partIndex, 
    step,
    offset,
    labelFormat = (label: string) => {return label}
}: PartLabelProps<D>) => {
    const theme = useTheme()
    const { animate, config: motionConfig } = useMotionConfig()

    const animatedProps = useSpring({
        transform: `translate(${part.x - (step.x * partIndex) + offset.x}, ${part.y - (step.y * partIndex) + offset.y})`,
        color: part.labelColor,
        config: motionConfig,
        immediate: !animate,
    })

    return (
        <animated.g transform={animatedProps.transform}>
                <animated.text
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={{
                        ...theme.labels.text,
                        fill: animatedProps.color,
                        pointerEvents: 'none',
                    }}
                >
                    {labelFormat(part.data.dataset!!) + " : " + part.formattedValue}
                </animated.text>
        </animated.g>
    )
}

interface PartLabelPrettyProps<D extends FunnelDatum> {
    part: FunnelPart<D>
    partIndex: number
    borderColor: string
    step: {x: number, y: number}
    offset: {x: number, y: number}
}

export const PartLabelPretty = <D extends FunnelDatum>({
    part, 
    partIndex, 
    borderColor,
    step,
    offset,
}: PartLabelPrettyProps<D>) => {
    const theme = useTheme()
    const { animate, config: motionConfig } = useMotionConfig()

    const animatedProps = useSpring({
        transform: `translate(${part.x - (step.x * partIndex) + offset.x}, ${part.y - (step.y * partIndex) + offset.y})`,
        color: part.labelColor,
        config: motionConfig,
        immediate: !animate,
    })

    return (
        <>
        <animated.g 
            fill={borderColor}
            transform={animatedProps.transform}>
                <animated.rect width={50} height={20} rx={5} x={-25} y = {-10}/>
        </animated.g>
        <animated.g
            transform={animatedProps.transform}>
            <animated.text
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                    ...theme.labels.text,
                    fill: animatedProps.color,
                    pointerEvents: 'none',
                }}>
                {part.formattedValue}
            </animated.text>
        </animated.g>
        </>
    )
}
