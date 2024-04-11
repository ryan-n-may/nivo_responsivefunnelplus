import { useSpring, animated } from '@react-spring/web'
import { useTheme, useMotionConfig, Margin } from '@nivo/core'
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
    itemDirection?: string,
    anchor?: string,
    direction?: string,
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
//<LegendItem color={color} label={dataset} />

/*
id: prop.dataset || "undefined",
                            label: prop.dataset || "undefined",
                            hidden: false,
                            color: prop.color,
                            fill: prop.color,
                            }]}
                            x = {innerWidth - margin.right}
                            y = {innerHeight - margin.bottom - margin.top}
                            itemWidth={itemWidth}
                            itemHeight={itemHeight}
                            symbolShape={prop.symbol}
                            symbolSize={symbolSize}
                            */