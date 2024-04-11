import { createElement, Fragment, ReactNode } from 'react'
import { SvgWrapper, Container, useDimensions, useTheme } from '@nivo/core'
import { svgDefaultProps } from './props'
import { useFunnel } from './hooks'
import { Parts } from './Parts'
import { Area, Line } from 'd3-shape'
import { PartLabels, SectionLabels } from './PartLabels'
import { Separators } from './Separators'
import { FunnelAnnotations } from './FunnelAnnotations'
import { BoxPosition, FunnelCustomLayerProps, FunnelDatum, FunnelLayerId, FunnelPart, FunnelSvgProps, Position, SeparatorProps } from './types'
import { FunnelLegend, FunnelLegendProps } from './FunnelLegend'

import { LegendSvg } from '@nivo/legends'
import { OrdinalColorScaleConfig } from '../../colors/src'

import { Axes, Grid } from '@nivo/axes'
import { ScaleLinear } from '@nivo/scales'
import { before } from 'lodash'


type InnerFunnelProps<D extends FunnelDatum> = Omit<
    FunnelSvgProps<D>,
    'animate' | 'motionConfig' | 'renderWrapper' | 'theme'
>

const InnerFunnel = <D extends FunnelDatum>({
    data,

    width,
    height,
    margin: partialMargin,
    direction = svgDefaultProps.direction,
    interpolation = svgDefaultProps.interpolation,
    spacing = svgDefaultProps.spacing,
    shapeBlending = svgDefaultProps.shapeBlending,

    valueFormat,
    labelFormat = (label: string) => {return label},

    colors = svgDefaultProps.colors,

    fillOpacity = svgDefaultProps.fillOpacity,
    borderWidth = svgDefaultProps.borderWidth,
    borderColor = svgDefaultProps.borderColor,
    borderOpacity = svgDefaultProps.borderOpacity,
    
    enableLabel = svgDefaultProps.enableLabel,
    enableAxisLabel = svgDefaultProps.enableAxisLabel,

    labelColor = svgDefaultProps.labelColor,
    sectionLabelColor = svgDefaultProps.sectionLabelColor,

    labelSpacing = svgDefaultProps.labelSpacing,
    labelDirection = svgDefaultProps.labelDirection,
    
    enableLegend = svgDefaultProps.enableLegend,
    legendItemDirection = svgDefaultProps.legendItemDirection,
    legendLayout = svgDefaultProps.legendLayout,
    legendAnchor = svgDefaultProps.legendAnchor,
    legendSymbolShape = svgDefaultProps.legendSymbolShape,
    
    enableBeforeSeparators = svgDefaultProps.enableBeforeSeparators,
    beforeSeparatorLength = svgDefaultProps.beforeSeparatorLength,
    beforeSeparatorOffset = svgDefaultProps.beforeSeparatorOffset,
    enableAfterSeparators = svgDefaultProps.enableAfterSeparators,
    afterSeparatorLength = svgDefaultProps.afterSeparatorLength,
    afterSeparatorOffset = svgDefaultProps.afterSeparatorOffset,
    layers = svgDefaultProps.layers,
    annotations = svgDefaultProps.annotations,
    isInteractive = svgDefaultProps.isInteractive,
    currentPartSizeExtension = svgDefaultProps.currentPartSizeExtension,
    currentBorderWidth,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip,
    role = svgDefaultProps.role,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
}: InnerFunnelProps<D>) => {
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const areaGeneratorsArray : Area<BoxPosition>[] = [];
    const borderGeneratorsArray : Line<Position | null>[] = [];
    const partsArray : FunnelPart<D>[][] = [];
    const beforeSeparatorsArray : SeparatorProps[][] = [];
    const afterSeparatorsArray : SeparatorProps[][] = [];
    const customLayerPropsArray : FunnelCustomLayerProps<D>[] = [];

    if(data[0] instanceof Array) { 
        let maxIndex : number = 0;
        const dataArray = data as D[][];
        const colorArray = colors as OrdinalColorScaleConfig<D>[];

        const getDatasetMax = (d : D[]) : number => {
            let max = 0;
            d.forEach( (e) => {
                max = e.value > max ? e.value : max; // update dataset max
            })
            return max;
        }
        // get largest value funnel chart and largest value from that chart
        dataArray.forEach( (d, di) => {
            let max = getDatasetMax(d);
            maxIndex = max < getDatasetMax(dataArray[maxIndex]) ? di : maxIndex; // update max dataset index
        })

        dataArray.map(
            (d, index) => {
                const diff = (direction == 'vertical' ? width : height) 
                    * ((getDatasetMax(d) - getDatasetMax(dataArray[maxIndex])) 
                    / (getDatasetMax(dataArray[maxIndex]) + getDatasetMax(d)))
                const {
                    areaGenerator,
                    borderGenerator,
                    parts,
                    beforeSeparators,
                    afterSeparators,
                    customLayerProps,
                } = useFunnel<D>({
                    data: d,
                    width: innerWidth,
                    height: innerHeight,
                    direction,
                    interpolation,
                    spacing,
                    shapeBlending,
                    valueFormat,
                    colors: colorArray[index],
                    fillOpacity,
                    borderWidth,
                    borderColor,
                    borderOpacity,
                    labelColor,
                    enableBeforeSeparators,
                    beforeSeparatorLength: beforeSeparatorLength + diff / 2,
                    beforeSeparatorOffset: beforeSeparatorOffset,
                    enableAfterSeparators,
                    afterSeparatorLength: afterSeparatorLength + diff / 2,
                    afterSeparatorOffset: afterSeparatorOffset,
                    isInteractive,
                    currentPartSizeExtension,
                    currentBorderWidth,
                    onMouseEnter,
                    onMouseMove,
                    onMouseLeave,
                    onClick,
                    tooltip,
                })
                areaGeneratorsArray.push(areaGenerator);
                borderGeneratorsArray.push(borderGenerator);
                partsArray.push(parts);
                beforeSeparatorsArray.push(beforeSeparators);
                afterSeparatorsArray.push(afterSeparators);
                customLayerPropsArray.push(customLayerProps);
            }
        )
    } else {
        const {
            areaGenerator,
            borderGenerator,
            parts,
            beforeSeparators,
            afterSeparators,
            customLayerProps,
        } = useFunnel<D>({
            data: data,
            width: innerWidth,
            height: innerHeight,
            direction,
            interpolation,
            spacing,
            shapeBlending,
            valueFormat,
            colors: colors,
            fillOpacity,
            borderWidth,
            borderColor,
            borderOpacity,
            labelColor,
            enableBeforeSeparators,
            beforeSeparatorLength: beforeSeparatorLength,
            beforeSeparatorOffset: beforeSeparatorOffset,
            enableAfterSeparators,
            afterSeparatorLength: afterSeparatorLength,
            afterSeparatorOffset: afterSeparatorOffset,
            isInteractive,
            currentPartSizeExtension,
            currentBorderWidth,
            onMouseEnter,
            onMouseMove,
            onMouseLeave,
            onClick,
            tooltip,
        })
        areaGeneratorsArray.push(areaGenerator);
        borderGeneratorsArray.push(borderGenerator);
        partsArray.push(parts);
        beforeSeparatorsArray.push(beforeSeparators);
        afterSeparatorsArray.push(afterSeparators);
        customLayerPropsArray. push(customLayerProps);
    } 
    
    
    const layerById: Record<FunnelLayerId, ReactNode> = {
        separators: null,
        parts: null,
        annotations: null,
        labels: null,
        axislabels: null,
        legend: null,
    }

    if (layers.includes('separators')) {
        layerById.separators = (
            <>
                { beforeSeparatorsArray.map((_, index) => {
                    return ( <Separators
                    key="separators"
                    beforeSeparators={beforeSeparatorsArray[index]}
                    afterSeparators={afterSeparatorsArray[index]}
                    /> )
                })}
            </>
        )
    }

    if (layers.includes('parts')) {
        layerById.parts = (
            <>
                { areaGeneratorsArray.map((_, index) => {
                    return( <Parts<D>
                        key="parts"
                        parts={partsArray[index]}
                        areaGenerator={areaGeneratorsArray[index]}
                        borderGenerator={borderGeneratorsArray[index]}
                    /> )
                })}
            </>
        )
    }

    if (layers.includes('labels') && enableLabel) {
        layerById.labels = (
            <>
                { partsArray.map((_, index) => {
                    return( <PartLabels<D> key="labels" parts={partsArray[index]} partIndex={index} labelFormat={labelFormat} itemSpacing={labelSpacing} direction={labelDirection}/> )
                })}         
            </>
        )
    }

    if (layers.includes('axislabels') && enableAxisLabel) {
        layerById.axislabels = (
            <SectionLabels<D> key="labels" parts={partsArray} margin={margin} direction={direction} labelColor={sectionLabelColor} /> 
        )
    }

    let legends : FunnelLegendProps[] = [];
    partsArray.map((part) => {
        const funnelLegend  = {
            label: labelFormat(part[0].data.dataset!!),
            id: part[0].data.dataset || "unknown dataset",
            color: part[0].color,
            fill: part[0].color,
            hidden: false,
        }
        legends.push(funnelLegend);
    })
    

    if (layers.includes('legend') && enableLegend) {
        layerById.legend = (
            <>
                <FunnelLegend 
                    props = {legends}
                    innerWidth={innerWidth}
                    innerHeight={innerHeight}
                    itemDirection={legendItemDirection}
                    direction={legendLayout}
                    anchor={legendAnchor}
                    symbolShape={legendSymbolShape}
                />
            </>
        )
    }

   

    if (layers?.includes('annotations')) {
        layerById.annotations = (
            <FunnelAnnotations<D> key="annotations" parts={partsArray[0]} annotations={annotations} />
        )
    }

    //<Legend dataset={data[0].dataset} color={parts[0].color } />

    

    return (
        <>
            <SvgWrapper
                width={outerWidth}
                height={outerHeight}
                margin={margin}
                role={role}
                ariaLabel={ariaLabel}
                ariaLabelledBy={ariaLabelledBy}
                ariaDescribedBy={ariaDescribedBy}
            >
                {layers.map((layer, i) => {
                    if (typeof layer === 'function') {
                        return <Fragment key={i}>{createElement(layer, customLayerPropsArray[1])}</Fragment>
                    }

                    return layerById?.[layer] ?? null
                })}
            </SvgWrapper>
        </>
    )
}

export const Funnel = <D extends FunnelDatum = FunnelDatum>({
    isInteractive = svgDefaultProps.isInteractive,
    animate = svgDefaultProps.animate,
    motionConfig = svgDefaultProps.motionConfig,
    theme,
    renderWrapper,
    ...otherProps
}: FunnelSvgProps<D>) => (
    <Container
        {...{
            animate,
            isInteractive,
            motionConfig,
            renderWrapper,
            theme,
        }}
    >
        <InnerFunnel<D> isInteractive={isInteractive} {...otherProps} />
        
    </Container>
)
