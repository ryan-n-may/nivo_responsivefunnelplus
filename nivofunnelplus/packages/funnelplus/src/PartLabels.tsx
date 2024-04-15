import React from 'react'
import { PartLabel, PartLabelPretty } from './PartLabel'
import { FunnelDatum, FunnelPart } from './types'

interface PartLabelsProps<D extends FunnelDatum> {
    parts: FunnelPart<D>[]
    partIndex: number
    itemSpacing: number,
    direction: 'column' | 'row'
    labelFormat?: { (label: string): string }
    labelStyle: 'verbose' | 'pretty'
}

export const PartLabels = <D extends FunnelDatum>({ parts, partIndex, labelFormat, labelStyle, itemSpacing, direction }: PartLabelsProps<D>) => {
    const itemWidth = 100;
    const itemHeight = 20;

    const xStep = direction === 'row' ? itemWidth + itemSpacing : 0
    const yStep = direction === 'column' ? itemHeight + itemSpacing : 0

    const xOffset = direction === 'row' ? (itemWidth+itemSpacing)/2 : 0
    const yOffset = direction === 'column' ? (itemHeight+itemSpacing)/2 : 0

    return(
        <>
            { labelStyle == 'pretty' ? 
                parts.map(part => ( 
                    <PartLabelPretty 
                        key={part.data.id} 
                        part={part} 
                        borderColor={part.color}
                        partIndex={partIndex} 
                        step={{x: xStep, y: yStep}} 
                        offset={{x: xOffset, y: yOffset}}
                        />
                ))
            :
                parts.map(part => ( 
                    <PartLabel 
                        key={part.data.id} 
                        part={part} 
                        labelFormat={labelFormat}
                        partIndex={partIndex} 
                        step={{x: xStep, y: yStep}} 
                        offset={{x: xOffset, y: yOffset}}
                        />  
                ))
            }
        </>
    )
}

//labelFormat={labelFormat}

