const MockedJSon = {
    data: {
      timelines: [
        {
          timestep: '1h',
          startTime: '2024-06-24T00:00:00Z',
          endTime: '2024-06-24T23:00:00Z',
          intervals: [
            {
              startTime: '2023-06-24T00:00:00Z',
              values: {
                windSpeed: 3,
                temperature: 25,
                temperatureApparent: 27,
              },
            },
            {
              startTime: '2024-06-24T01:00:00Z',
              values: {
                windSpeed: 7,
                temperature: 21,
                temperatureApparent: 20,
              },
            },
          ],
        },
      ],
    },
    warnings: [
      {
        code: 246009,
        type: 'Missing Time Range',
        message:
          'The timestep is not supported in full for the time range requested.',
        meta: {
          timestep: '1h',
          from: 'now',
          to: '+1m',
        },
      },
    ],
  };
  
  export default MockedJSon;
  