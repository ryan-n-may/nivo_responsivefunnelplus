# @Nivo Responsive Funnel ++

(WIP)

An addition to Nivo's responsive funnel that adds functionality &amp; supports multiple data sources. 
This addresses limitations of the base nivo funnel chart including: insufficent labeling, no support for multiple funnel areas, and no legends. 

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white) 
<img src="https://raw.githubusercontent.com/plouc/nivo/master/nivo.png" width="80" height="25">


### Additions:
* [x] Multiple data sources.
* [x] Multiple colour inputs.
* [x] Customisable legends 
* [x] Customisable data labels.
* [x] Axis labels.
* [x] Auto-scaling data. 
* [ ] Interactivity (TODO)
* [ ] Collapsable chart segments (TODO)

### Example: 


### Usage: 
```JSX
<ResponsiveFunnelPlus
  /*
    Mandatory props
  */

  data = {[
    source1,
    source2,
  ]} // FunnelDatum[][] | FunnelDatum[]
  colors = {[
    color1,
    color2,
  ]} // OrdinalColorScaleConfig<FunnelDatum>[] | OrdinalColorScaleConfig<FunnelDatum>

  /*
    Optional props
  */
  // I have intentionally excluded some props included in @Nivo FunnelChart for brevity.
  // https://github.com/plouc/nivo
  
  // Autoscaling on input data (to maintain relative funnel chart sizes) is achieved via segments,
  // editing the afterSegment and beforeSegment props may cause strange behaviour. 

  // Chart props
  margin = { {top: 0, right: 0, bottom: 0, left: 0} } // Margin
  spacing={1} // number
  fillOpacity = {0.3} // number
  shapeBlending = {0.3} // number
  direction = {'vertical'} // 'verical' | 'horizontal'
  layers={['separators', 'parts', 'labels', 'axislabels', 'legend', 'annotations']}

  // Legend props
  enableLegend={true} // boolean
  legendAnchor={'bottom-right'} // 'bottom-right' | 'bottom' | 'bottom-left' | 'top-left' | 'top-right' | 'top' | 'left' | 'right' | undefined
  legendItemDirection={'left-to-right'} // 'left-to-right' | 'right-to-left' | 'top-to-bottom'
  legendLayout={'row'} // 'row' | 'column'
  legendSymbolShape={'circle'} // 'circle' | 'triangle' | 'square' | 'diamond'

  // Label props
  enableLabel={true} // boolean
  labelSpacing={5} // number
  labelDirection={'column'} // 'row' | 'column'
  labelColor={'black'} // OrdinalColorScaleConfig<FunnelDatum> | string

  // Axis props
  enableAxisLabel={true} // boolean
  valueFormat={'>-.3s'}
  labelFormat={displayDate} // (label: string) => {string}
  sectionLabelColor={'dark-gray'} // OrdinalColorScaleConfig<FunnelDatum> | string
/>
```

asd
