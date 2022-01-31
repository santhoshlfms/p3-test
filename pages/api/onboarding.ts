// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  url: string;
};

var consumerOnboardingData = JSON.stringify({
  "person_details": {
    "names": [
      {
        "given_name": "hellow",
        "surname": "raj",
        "confirmation": {
          "status": "CONFIRMED"
        }
      }
    ],
    "date_of_birth": {
      "date": "1970-01-01",
      "confirmation": {
        "status": "CONFIRMED"
      }
    },
    "origin_country_code": "KE",
    "phone_contacts": [
      {
        "phone": {
          "country_code": "81",
          "national_number": "8041411111"
        },
        "phone_type": "MOBILE",
        "confirmation": {
          "status": "CONFIRMED"
        }
      }
    ],
    "addresses": [
      {
        "address": {
          "line1": "58371-00200 City Square",
          "line2": "Box 2512-00100",
          "city": "Nairobi",
          "state": "Nairobi",
          "country_code": "KE",
          "postal_code": "20115"
        },
        "address_type": "HOME",
        "confirmation": {
          "status": "CONFIRMED"
        }
      }
    ],
    "email_addresses": [
      {
        "email_address": "rana-newpaidylogo@paypal.com",
        "primary": true,
        "confirmed": true
      }
    ],
    "locale": "ke_KE",
    "nationality": "KE"
  },
  "paypal_account_properties": {
    "account_country_code": "KE"
  }
});

var linkedInstrumentApiPayload = {
  "card_accounts": [
    {
      "identifier": "4032030646243999",
      "reference_financial_instrument_id": "B2121XYZ1" +  Date.now().toString(),
      "expiry_date": "2026-07",
      "billing_address": {
        "address_line_1": "58371-00200 City Square",
        "address_line_2": "Box 2512-00100",
        "admin_area_1": "Nairobi",
        "admin_area_2": "Nairobi",
        "country_code": "KE",
        "postal_code": "20115"
      },
      "confirmation": {
        "status": "CONFIRMED"
      },
      "account_holder_name": {
        "given_name": "Mr tum",
        "surname": "yum"
      }
    }
  ],
  "referral_id": ""
}

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic QVZoM2FxUUl6N1ZaaUd6ZFpxOTJEaFdiRjd4OWo1WWU5dldYVks5ME9BTUgyaWt4dXZBNlkxVUtramI4V3hWUFZKQVdscjdhQk9BTm05VmE6RVBKSzB4TEVvUmJaU1JaY0VqOXVNbWJNWE90TWdDVksxTGRUbDZRSWtaUUNHaG5OWTlqbFRaOE8tbkgyWmRuWU16cXF5UzQ1RXpyTkRaZDk=");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: consumerOnboardingData
};

let config = {
  clientId:
    "AVh3aqQIz7VZiGzdZq92DhWbF7x9j5Ye9vWXVK90OAMH2ikxuvA6Y1UKkjb8WxVPVJAWlr7aBOANm9Va",
  secret:
    "EPJK0xLEoRbZSRZcEj9uMmbMXOtMgCVK1LdTl6QIkZQCGhnNY9jlTZ8O-nH2ZdnYMzqqyS45EzrNDZd9",
  basic:
    "Basic QVZoM2FxUUl6N1ZaaUd6ZFpxOTJEaFdiRjd4OWo1WWU5dldYVks5ME9BTUgyaWt4dXZBNlkxVUtramI4V3hWUFZKQVdscjdhQk9BTm05VmE6RVBKSzB4TEVvUmJaU1JaY0VqOXVNbWJNWE90TWdDVksxTGRUbDZRSWtaUUNHaG5OWTlqbFRaOE8tbkgyWmRuWU16cXF5UzQ1RXpyTkRaZDk=",
};

const consumerReferralApi = (requestOptions:any, cb:any) => {
  fetch("https://api.sandbox.paypal.com/v1/customer/consumer-referrals", requestOptions).then((res) => res.json())
  .then(
    (data) => {
      //cb(data)
      console.log("completed consumer refferal")
      console.log(data )
      linkedInstrumentApi(data, function(resp: any){
        cb(data)
      })
    },
    (error) => {
      console.log(error);
    }
  );
};
  


const linkedInstrumentApi = (data: any, cb:any ) => {
//res.status(200).json({ name: "John Doe" });
console.log("linkedInstrumentApi", data)
linkedInstrumentApiPayload.referral_id = data.referral_id;
console.log(linkedInstrumentApiPayload )
requestOptions.body = JSON.stringify(linkedInstrumentApiPayload)
//console.log(requestOptions.body )
fetch("https://api.sandbox.paypal.com/v1/payment-networks/linked-instruments", requestOptions).then((res) => res.json())
.then(
  (data) => {
    console.log(data)
    cb(data)
  },
  (error) => {
    console.log(error);
  }
);
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  consumerReferralApi(requestOptions, function(data:any){
    console.log(data)
    let onboardingURL = `https://www.sandbox.paypal.com/consumeronboarding/entry?referralid=`+data.referral_id+`&redirect_uri=https://shopping-paypal.herokuapp.com/thankyou&state=channel%3DMobile%26Linkid%3Dtest&scope=scope_group_provisioning_platform`
    console.log(onboardingURL)
    res.status(200).json({ url: onboardingURL });
  })
}
