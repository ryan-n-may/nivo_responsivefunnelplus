import React from 'react'
import { BoxLegendSvg } from '@nivo/legends'

export interface FunnelLegendProps {
    id: string,
    label: string,
    color?: string,
    fill?: string,
    hidden?: boolean,
}

export interface FunnelLegendsProps {
    props: FunnelLegendProps[]
    innerWidth: number
    innerHeight: number
    itemDirection?: "left-to-right" | "right-to-left" | "top-to-bottom" | "bottom-to-top",
    anchor?: "left" | "right" | "bottom" | "top" | "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right",
    direction?: "column" | "row",
    symbolShape?: "circle" | "square" | "triangle" | "diamond"
    symbolSize?: number
    itemHeight?: number
    itemWidth?: number
}

export const FunnelLegend = ({
    props, 
    innerWidth,
    innerHeight,
    itemDirection = 'left-to-right',
    anchor = 'bottom-right',
    direction = 'row',
    symbolShape = "circle",
    symbolSize = 15,
    itemHeight = 50,
    itemWidth = 100
} : FunnelLegendsProps) => {
    return (
        <>
            <BoxLegendSvg 
                data={props}
                symbolShape={symbolShape}
                symbolSize={symbolSize}
                containerWidth={innerWidth}
                containerHeight={innerHeight}
                itemWidth={itemWidth}
                itemHeight={itemHeight}
                direction={direction}
                itemDirection={itemDirection}
                anchor={anchor}
            />
        </>
    )
}
