import axios from 'axios';

export class CurrencyCoverter {
  private isAvailableStatus: boolean;

  constructor() {
    if (process.env.API_KEY) {
      this.isAvailableStatus = false;
    } else {
      this.isAvailableStatus = true;
    }
  }

  isAvailable() {
    return this.isAvailableStatus;
  }

  async convert(from: string, to: string, amount: number) {
    const response = await axios.get('https://data.fixer.io/api/convert', {
      params: {
        access_key: process.env.API_KEY,
        from,
        to,
        amount,
      },
    });
    // {
    //     "success": true,
    //     "query": {
    //         "from": "GBP",
    //         "to": "JPY",
    //         "amount": 25
    //     },
    //     "info": {
    //         "timestamp": 1519328414,
    //         "rate": 148.972231
    //     },
    //     "historical": ""
    //     "date": "2018-02-22"
    //     "result": 3724.305775
    // }
    return response.data.result;
  }
}
