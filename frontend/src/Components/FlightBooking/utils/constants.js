export const formDefaultValues = {
  oneWayTrip:null,
  origin: "skardu",
  destination: "islamabad",
  journeyDate: "",
  returnDate: "",
  number_of_adults: 0,
  number_of_children: 0,
  number_of_infants: 0,
  adults: [
    {
      firstName: "",
      surname: "",
      date_of_birth: "",
      phoneNumber: "",
      gender: "male",
    },
  ],
  children: [
    {
      firstName: "",
      surname: "",
      date_of_birth: "",
      gender: "male",
    },
  ],
  infants: [
    {
      firstName: "",
      surname: "",
      date_of_birth: "",
      gender: "",
      age: 2,
    },
  ],
  airline: " ",
  cabin: "",
  adultFare:"",
  childFare: "",
  infantFare:null,
  taxes: 10,
  salesCommission: 10,
  discount: 2,
  gender: "male",
  firstName: "test",
  surName: "test",
  date_of_birth: "10/10/10",
  email: "test@gmail.com",
  phone: "+92 35555071004",
  pnrNumber: "99999",
  ticket: "ticket number is one",
  issueBy: "test",
  ledger: "idk",
  code: "1000",
  grandTotal: 0,
  flight_id:null,
};
