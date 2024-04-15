// @ts-ignore
import { motionDefaultProps } from '@nivo/core'
import { FunnelLayerId } from './types'

export const svgDefaultProps = {
    layers: ['separators', 'parts', 'labels', 'legend', 'annotations'] as FunnelLayerId[],

    direction: 'vertical' as const,
    interpolation: 'smooth' as const,
    spacing: 0,
    shapeBlending: 0.66,

    colors: { scheme: 'nivo' as const },
    fillOpacity: 1,

    borderWidth: 6,
    borderColor: { from: 'color' },
    borderOpacity: 0.66,

    enableLabel: true,
    enableAxisLabel: true,

    labelSpacing: 20,
    labelDirection: 'column' as 'column' | 'row',

    labelColor: { theme: 'background' },
    sectionLabelColor: {theme: 'background'},

    enableLegend : true,
    legendItemDirection : 'left-to-right' as "left-to-right" | "right-to-left" | "top-to-bottom" | "bottom-to-top",
    legendLayout : 'row' as 'row' | 'column',
    legendAnchor : 'bottom-right' as  "left" | "right" | "bottom" | "top" | "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right",
    legendSymbolShape : 'circle' as 'circle' | 'triangle' | 'square' | 'diamond' | undefined,

    enableBeforeSeparators: true,
    beforeSeparatorLength: 0,
    beforeSeparatorOffset: 0,
    enableAfterSeparators: true,
    afterSeparatorLength: 0,
    afterSeparatorOffset: 0,

    annotations: [],

    isInteractive: true,
    currentPartSizeExtension: 0,

    role: 'img',

    animate: motionDefaultProps.animate,
    motionConfig: motionDefaultProps.config,
}
