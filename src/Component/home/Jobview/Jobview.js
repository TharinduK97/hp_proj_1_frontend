import React, {Component} from 'react';
import './Jobview.css';
import { withRouter } from "react-router";
import axios from 'axios';
import * as actions from "../../../store/actions";
import connect from "react-redux/es/connect/connect";

class Jobview extends Component {

    constructor(props) {
        super(props)
        this.state = {
            job: [],
            error: false,

        }
    }

    componentDidMount() {

            fetch('https://localhost:5001/Job/'+this.props.match.params.id)
            .then(res => res.json())
            .then(job =>
                this.setState({ job:job.data}),

            )
            .catch(error => {

                this.setState({error: true});
            });

    }

    handlesubmit=()=>{
        // console.log(this.props.token)
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = "0" + dd;
        }
        if (mm < 10) {
            mm = "0" + mm;
        }
        var today = yyyy + "-" + mm + "-" + dd;

        if (this.props.isAuthenticated) {


            var config = {
                method: 'post',
                url: 'https://localhost:5001/AppliedJob',
                headers: {
                    'Authorization': `Bearer ${this.props.token} `,
                    'Content-Type': 'application/json'
                },
                data : {

                    "jobStatus": "Pending",
                     "createdAt": `${today}`,
                    "jobID": this.props.applicant_id

                }
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    alert("sucess");
                })
                .catch(function (error) {
                    console.log(error);
                });



            // axios.post('https://localhost:5001/AppliedJob', {
            //
            //         jobStatus: "Pending",
            //         createdAt: "2021-08-18T17:19:03.943Z",
            //         jobID: this.props.match.params.id
            //
            //     })
            //     .then(response => {
            //         console.log("ok");
            //         // alert('submitted');
            //     })
            //     .catch(error => {
            //         console.log(error)
            //     })

        } else {
            alert("Please Sign In");
            this.props.history.push('/signin');

        }
    }


    render() {


        return (

            // <div>
            //
            //     <div className="App">
            //         <br/>
            //         <div class="container scr border border-danger">
            //
            //             <div class="row">
            //
            //
            //             </div>
            //
            //
            //             <div class="row">
            //
            //                 <div class="col-sm-2">
            //
            //                     <div class="row"></div>
            //
            //
            //                 </div>
            //
            //
            //                 <div class="col-sm-1">
            //
            //
            //                 </div>
            //
            //
            //                 <div class="col-sm-8 detail">
            //
            //                     <div class="row ">
            //                         <div class="row"><h3>{this.state.job.title} </h3></div>
            //                         <div class="col-sm-1"></div>
            //
            //                     </div>
            //                     <br/>
            //                     <div className="row">
            //                         <div className="col-sm-1"></div>
            //
            //                         <div className="col-sm-3"><h6 className="mb-0"><label>Skills</label></h6>
            //                         </div>
            //                         <div className="col-sm-8">{this.state.job.skills}</div>
            //                     </div>
            //                     <hr/>
            //
            //                     <div class="row">
            //                         <div class="col-sm-1"></div>
            //
            //                         <div class="col-sm-3"><h6 class="mb-0"><label>Salary</label></h6></div>
            //                         <div class="col-sm-8">{this.state.job.salary} (LKR)</div>
            //                     </div>
            //                     <hr/>
            //                     <div className="row">
            //                         <div className="col-sm-1"></div>
            //
            //                         <div className="col-sm-3"><h6 className="mb-0"><label>Deadline</label></h6></div>
            //                         <div className="col-sm-8">{this.state.job.deadline}</div>
            //                     </div>
            //                     <hr/>
            //                     <div class="row">
            //
            //                         <div class="col-sm-1"></div>
            //
            //                         <div class="col-sm-3"><h6 class="mb-0"><label>Description</label></h6></div>
            //                         <div class="col-sm-8">{this.state.job.description}</div>
            //                     </div>
            //
            //                     <hr/>
            //
            //                     <div class="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            //                         <div class="modal-dialog">
            //                             <div class="modal-content">
            //                                 <div class="modal-header">
            //                                     <h5 class="modal-title" id="staticBackdropLabel">Confirm here</h5>
            //                                     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            //                                 </div>
            //
            //
            //                                 <div class="modal-footer">
            //                                     <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            //                                     <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={this.handlesubmit}>Confirm</button>
            //                                 </div>
            //                             </div>
            //                         </div>
            //                     </div>
            //
            //                     <div class="row">
            //                         <div class="col-sm-5"></div>
            //                         <div class="col-sm-4"></div>
            //                         <div class="col-sm-3">
            //                             <button type="submit" className="btn btn-danger "  data-bs-toggle="modal" data-bs-target="#staticBackdrop">Apply</button>
            //                         </div>
            //                     </div>
            //
            //
            //
            //
            //
            //                 </div>
            //
            //
            //             </div>
            //
            //
            //         </div>
            //         <br/>
            //     </div>
            //
            // </div>

            <div>
                <br/>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-1">

                        </div>
                        <div className="col-sm-10">

                            <div className="card border-secondary">
                                <h5 className="card-header  text-secondary">{this.state.job.title}</h5>
                                <div className="card-body  text-secondary">
                                    <div className="container">
                                        <div className="row">

                                            <div className="col">
                                                <p className="card-title">Skills - {this.state.job.skills}</p>
                                                <br/>
                                            </div>
                                            <div className="col">

                                            </div>
                                            <div className="col">
                                                <p className="card-title">Date - {this.state.job.limitLine}</p>

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <p className="card-title">Salary - {this.state.job.salary}</p>
                                                <br/>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <p className="card-title">Type - {this.state.job.fullPart}</p>
                                            </div>

                                        </div>
<br/>
                                        <div className="row">
                                            <div className="col-8">

                                                <p className="card-text"><u>Job Requirment</u></p>

                                                <p className="card-text">{this.state.job.description}</p>

                                            </div>

                                            <div className="col-4">


                                            </div>

                                        </div>

                                        <div className="modal fade " id="staticBackdrop" data-bs-backdrop="static"
                                             data-bs-keyboard="false" tabIndex="-1"
                                             aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                             <div className="modal-dialog">
                                             <div className="modal-content">
                                             <div className="modal-header">
                                             <h5 className="modal-title" id="staticBackdropLabel">Confirm here</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                       aria-label="Close"></button>
                                             </div>


                                            <div className="modal-footer">
                                             <button type="button" className="btn btn-secondary"
                                                       data-bs-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                                       onClick={this.handlesubmit}>Confirm</button>
                                             </div>
                                             </div>
                                             </div>

                                        </div>


                                        <div className="row">
                                            <div className="col">

                                            </div>
                                            <div className="col">

                                            </div>
                                            <div className="col">
                                                <button type="submit" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Apply</button>
                                            </div>
                                        </div>

                                    </div>


                                </div>
                            </div>


                        </div>
                        <div className="col-sm-1">

                        </div>
                    </div>
                </div>
<br/>
            </div>

        )


    }
}


const mapStateToProps = state => {
    return {
        applicant_id: state.auth.userId,
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token

    }
};

const mapDispatchToProps = dispatch => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Jobview);

