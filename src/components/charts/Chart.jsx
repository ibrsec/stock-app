 

 
import { axisClasses } from '@mui/x-charts';
import { LineChart } from '@mui/x-charts/LineChart';
import { useSelector } from 'react-redux';

const otherSetting = {
    height: 300, 
    // yAxis: [{ label: 'rainfall (mm)' }],
    grid: { horizontal: true },
    sx: {
      [`& .${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translateX(-10px)',
      },
    },
  };
export default function Chart({datas,dataName}) {

    
     
  return (
    <LineChart
     


      dataset={datas}
      xAxis={[
        {
          scaleType: 'band',
          dataKey: 'createdAt',
          valueFormatter: (createdAt, context) =>{ 
            return (context.location === 'tick'
              ? `${createdAt.slice(0,createdAt.indexOf("T")).replaceAll("-",".")}`
              : `${createdAt.slice(0,createdAt.indexOf("T")).replaceAll("-",".")}`)
            }
        },
      ]}
      series={[{ dataKey: 'amount', label: `Total ${dataName}(USD)`, valueFormatter: (value)=> `${value}$`  }]}
      {...otherSetting}

 



      width={500}
      height={300}
    />
  );
}
