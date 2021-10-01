import React from "react";
import axios from "axios";
import { Card } from "react-bootstrap";

//============================================= Payment Component ==========================================
export interface PaymentProps {
  paymentEntry: {
    docName: string;
    amount: string;
    date: Date;
    //time: Time;
  };
}

const Payment = (props: PaymentProps) => {
  //A Payment component to be put in the list
  return (
    <tr>
      <td>{props.paymentEntry.docName}</td>
      <td>{props.paymentEntry.amount}</td>
      <td>{props.paymentEntry.date}</td>
      {/* <td>{props.paymentEntry.time}</td> */}
    </tr>
  );
};

//========================================================================================================

export interface PatientPaymentsProps {}

export interface PatientPaymentsState {
  payments: {
    docName: string;
    amount: string;
    date: Date;
  }[];
}

class PatientPayments extends React.Component<
  PatientPaymentsProps,
  PatientPaymentsState
> {
  state = {
    payments: [],
  };

  paymentList = () => {
    return this.state.payments.map((payment) => {
      return <Payment paymentEntry={payment} key={Math.random()} />; // *****Change the Key*******
    });
  };

  getPayments = async () => {
    try {
      const payments = await axios.get(
        "https://jsonplaceholder.typicode.com/users" //TODO : API
      );

      //======================================================================
      let payment_list: any[] = [];
      payments.data.forEach((payment: any) => {
        payment_list.push({
          docName: payment.name,
          amount: "Rs. " + payment.id,
          date: payment.email,
        });
      });
      //=======================================================================

      this.setState({ payments: payment_list.slice(0, 5) }); //<---- fetched data
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount = () => {
    //fetch doctors from the database
    this.getPayments();
  };

  render() {
    return (
      <>
        <div className="d-flex mb-auto mt-5">
          <div>
            {" "}
            &nbsp;
            <div>
              &nbsp;
              <h2>Payments</h2> &nbsp;
            </div>
            <div>
              <Card className="rounded shadow p-3 mb-5 bg-white rounded">
                <table className="table" style={{ width: "800px", margin: 0 }}>
                  <thead>
                    <tr>
                      <th key="doc" scope="col">
                        Doctor's Name
                      </th>
                      <th key="esp" scope="col">
                        Amount
                      </th>
                      <th key="age" scope="col">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>{this.paymentList()}</tbody>
                </table>
              </Card>
            </div>
          </div>
        </div>
        <button type="button" className="btn btn-primary btn-lg" id="btn-1">
          Request a Refund
        </button>
      </>
    );
  }
}

export default PatientPayments;
