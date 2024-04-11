import { Margin } from '@nivo/core'
import { PartLabel, SectionLabel } from './PartLabel'
import { FunnelDatum, FunnelDirection, FunnelPart } from './types'
import { InheritedColorConfig } from '../../colors/src'

interface PartLabelsProps<D extends FunnelDatum> {
    parts: FunnelPart<D>[]
    partIndex: number
    itemSpacing: number,
    direction: 'column' | 'row'
    labelFormat?: { (label: string): string }
}

export const PartLabels = <D extends FunnelDatum>({ parts, partIndex, labelFormat, itemSpacing, direction }: PartLabelsProps<D>) => {
    const itemWidth = 100;
    const itemHeight = 20;

    const xStep = direction === 'row' ? itemWidth + itemSpacing : 0
    const yStep = direction === 'column' ? itemHeight + itemSpacing : 0

    const xOffset = direction === 'row' ? (itemWidth+itemSpacing)/2 : 0
    const yOffset = direction === 'column' ? (itemHeight+itemSpacing)/2 : 0

    return(
        <>
            {parts.map(part => (
                <PartLabel 
                    key={part.data.id} 
                    part={part} 
                    partIndex={partIndex} 
                    step={{x: xStep, y: yStep}} 
                    offset={{x: xOffset, y: yOffset}}
                    labelFormat={labelFormat}/>
            ))}
        </>
    )
}

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

