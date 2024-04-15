import React from 'react'
import { Margin } from '@nivo/core'
import { SectionLabel } from './SectionLabel'
import { FunnelDatum, FunnelDirection, FunnelPart } from './types'
import { InheritedColorConfig } from '@nivo/colors'

interface SectionLabelsProps<D extends FunnelDatum> {
    parts: FunnelPart<D>[][]
    margin?: Margin
    direction?: FunnelDirection
    labelColor?: InheritedColorConfig<FunnelPart<D>>
}

export const SectionLabels = <D extends FunnelDatum>({ 
    parts, 
    margin,
    direction = 'vertical',
    labelColor = 'black'
}: SectionLabelsProps<D>) => (
    <>
        {parts[0].map(part => (
            <SectionLabel key={part.data.id} part={part} margin={margin} direction={direction} sectionColor={labelColor}/>
        ))}
    </>
)

