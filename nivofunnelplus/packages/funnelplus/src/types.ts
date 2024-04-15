import { AriaAttributes, FunctionComponent, MouseEvent } from 'react'
import { Area, Line } from 'd3-shape'
import { Box, Theme, Dimensions, MotionProps, ValueFormat } from '@nivo/core'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { AnnotationMatcher } from "@nivo/annotations"
import { PartTooltipProps } from './PartTooltip'

export interface FunnelDatum {
    id: string | number
    value: number
    label?: string
    dataset?: string
}


export interface Position {
    x: number
    y: number
}

export interface BoxPosition extends Position {
    x0: number
    x1: number
    y0: number
    y1: number
}

export type FunnelDirection = 'horizontal' | 'vertical'

export type FunnelAreaPoint = BoxPosition

export type FunnelAreaGenerator = Area<FunnelAreaPoint>

export type FunnelBorderGenerator = Line<Position | null>

export interface FunnelPart<D extends FunnelDatum> extends BoxPosition {
    data: D
    width: number
    height: number
    color: string
    fillOpacity: number
    borderWidth: number
    borderColor: string
    borderOpacity: number
    labelColor: string
    formattedValue: number | string
    isCurrent: boolean
    points: Position[]
    areaPoints: FunnelAreaPoint[]
    borderPoints: (Position | null)[]
}

export interface SeparatorProps extends Omit<BoxPosition, 'x' | 'y'> {
    partId: string | number
}

export interface FunnelDataProps<D extends FunnelDatum> {
    data: D[] | D[][]
}

export type FunnelPartEventHandler<D extends FunnelDatum> = (
    part: FunnelPart<D>,
    event: MouseEvent
) => void

export interface FunnelPartWithHandlers<D extends FunnelDatum> extends FunnelPart<D> {
    onMouseEnter?: () => void
    onMouseLeave?: () => void
    onMouseMove?: () => void
    onClick?: () => void
}

export type FunnelLayerId = 'separators' | 'parts' | 'labels' | 'legend' | 'annotations' | 'axislabels'
export interface FunnelCustomLayerProps<D extends FunnelDatum> {
    width: number
    height: number
    parts: FunnelPartWithHandlers<D>[]
    areaGenerator: FunnelAreaGenerator
    borderGenerator: FunnelBorderGenerator
    beforeSeparators: SeparatorProps[]
    afterSeparators: SeparatorProps[]
    setCurrentPartId: (id: string | number) => void
}
export type FunnelCustomLayer<D extends FunnelDatum> = FunctionComponent<FunnelCustomLayerProps<D>>

export interface FunnelCommonProps<D extends FunnelDatum> {
    margin: Box

    layers: (FunnelLayerId | FunnelCustomLayer<D>)[]

    valueFormat: ValueFormat<number>
    labelFormat: { (label:string) : string }

    direction: FunnelDirection
    interpolation: 'smooth' | 'linear'
    spacing: number
    shapeBlending: number

    theme: Theme
    colors: OrdinalColorScaleConfig<D> | OrdinalColorScaleConfig<D>[]

    fillOpacity: number
    borderWidth: number
    borderColor: InheritedColorConfig<FunnelPart<D>>
    borderOpacity: number

    enableLabel: boolean
    enableAxisLabel: boolean

    labelSpacing: number
    labelDirection: 'row' | 'column'

    labelColor: InheritedColorConfig<FunnelPart<D>>
    sectionLabelColor: InheritedColorConfig<FunnelPart<D>>

    enableLegend: boolean
    legendItemDirection: "left-to-right" | "right-to-left" | "top-to-bottom" | "bottom-to-top" | undefined
    legendLayout: 'row' | 'column' | undefined
    legendAnchor:  "left" | "right" | "bottom" | "top" | "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | undefined
    legendSymbolShape: 'circle' | 'square' | 'diamond' | 'triangle' | undefined

    enableBeforeSeparators: boolean
    beforeSeparatorLength: number
    beforeSeparatorOffset: number
    enableAfterSeparators: boolean
    afterSeparatorLength: number
    afterSeparatorOffset: number

    isInteractive: boolean
    currentPartSizeExtension: number
    currentBorderWidth: number
    onMouseEnter: FunnelPartEventHandler<D>
    onMouseLeave: FunnelPartEventHandler<D>
    onMouseMove: FunnelPartEventHandler<D>
    onClick: FunnelPartEventHandler<D>
    tooltip: (props: PartTooltipProps<D>) => JSX.Element

    renderWrapper: boolean

    role: string
    ariaLabel: AriaAttributes['aria-label']
    ariaLabelledBy: AriaAttributes['aria-labelledby']
    ariaDescribedBy: AriaAttributes['aria-describedby']

    annotations: AnnotationMatcher<FunnelPart<D>>[]
}

export type FunnelSvgProps<D extends FunnelDatum> = Partial<FunnelCommonProps<D>> &
    FunnelDataProps<D> &
    Dimensions &
    MotionProps
