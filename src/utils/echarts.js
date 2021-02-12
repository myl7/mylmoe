import * as echarts from 'echarts/core'
import {PieChart, LineChart} from 'echarts/charts'
import {TitleComponent, TooltipComponent, LegendComponent, GridComponent} from 'echarts/components'
import {CanvasRenderer} from 'echarts/renderers'

echarts.use([PieChart, LineChart])
echarts.use([TitleComponent, TooltipComponent, LegendComponent, GridComponent])
echarts.use([CanvasRenderer])

export default echarts
