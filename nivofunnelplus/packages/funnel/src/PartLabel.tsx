import { useSpring, animated } from '@react-spring/web'
import { useTheme, useMotionConfig, Margin } from '@nivo/core'
import { FunnelDatum, FunnelPart } from './types'
import { displayDate } from '../../../../modules/formatService';
import { useState } from 'react';
import { InheritedColorConfig } from '../../colors/src';

import { computeDimensions } from '../../legends/src/compute'

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
                    fill: animatedProps.color,
                    pointerEvents: 'none',
                }}>
                {part.data.label}
            </animated.text>
        </animated.g>
    )
}