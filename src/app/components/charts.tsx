'use client'

import { BarChart } from '@tinybirdco/charts'

// make sure to keep params when copying other values from Tinybird
export function StatusProgress(params: {
    member_id?: string
}) {
  return (
    <>
        {/* <BarChart
            endpoint=""
            token = ""
            index="type"
            categories={['future', 'past']}
            colorPalette={['#27F795', '#008060', '#0EB1B9', '#9263AF', '#5A6FC0', '#86BFDB', '#FFC145', '#FF6B6C', '#DC82C8', '#FFC0F1']}
            stacked={true}
            title="Status Progress"
            description="10K - Bronze | 20K - Silver | 30K - Gold | 40K - Platinum"
            showLegend={true}
            height="500px"
            params={params}
        /> */}
    </>
  );
}
