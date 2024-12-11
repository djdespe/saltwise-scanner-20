import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Lun', salt: 4.2 },
  { day: 'Mar', salt: 3.8 },
  { day: 'Mer', salt: 4.5 },
  { day: 'Jeu', salt: 3.2 },
  { day: 'Ven', salt: 4.8 },
  { day: 'Sam', salt: 3.9 },
  { day: 'Dim', salt: 4.1 },
];

const DailySaltChart = () => {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="day" 
            stroke="#666"
            tick={{ fill: '#666' }}
          />
          <YAxis 
            stroke="#666"
            tick={{ fill: '#666' }}
          />
          <Tooltip 
            contentStyle={{
              background: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="salt" 
            stroke="#ff7c2d"
            strokeWidth={2}
            dot={{ fill: '#ff7c2d', strokeWidth: 2 }}
            activeDot={{ r: 6, fill: '#ff7c2d' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailySaltChart;