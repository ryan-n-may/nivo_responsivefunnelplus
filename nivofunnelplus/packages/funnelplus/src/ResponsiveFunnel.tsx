import React from 'react'
import { ResponsiveWrapper } from '@nivo/core'
import { FunnelDatum, FunnelSvgProps } from './types'
import { Funnel } from './Funnel'

export const ResponsiveFunnelPlus = <D extends FunnelDatum = FunnelDatum>(
    props: Omit<FunnelSvgProps<D>, 'height' | 'width'>
) => (
    <>
        <ResponsiveWrapper>
            {({ width, height }) => <Funnel<D> width={width} height={height} {...props} />}
        </ResponsiveWrapper>
    </>
)
