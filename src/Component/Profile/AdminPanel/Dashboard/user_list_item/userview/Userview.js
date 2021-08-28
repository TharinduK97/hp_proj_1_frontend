import React, {Component, useEffect, useState} from 'react';

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import WcIcon from '@material-ui/icons/Wc';
import EmailIcon from '@material-ui/icons/Email';
import {Link} from 'react-router-dom'
import LockIcon from '@material-ui/icons/Lock';
import LaptopIcon from '@material-ui/icons/Laptop';
import WorkIcon from '@material-ui/icons/Work';
import connect from "react-redux/es/connect/connect";
import axios from "axios";
import {History} from 'react-router-dom';
import * as actions from '../../../../../../../src/store/actions/index';
import Password from '../../../../password'
import Admin_applied_jobs from "../../aplliedjobs_admin/joblist/admin_applied_jobs";
import User_list_item from "../user_list_item";

class Userview extends Component {

    constructor(props) {
        super(props)
        this.state = {
            applicant: [],
            error: false,
            cv:null,
            img:null,
            cvpath:null,
        }

    }

    componentDidMount() {
        fetch('https://localhost:5001/User/' + this.props.match.params.id)//2
            .then(res => res.json())
            .then(applicant =>
                this.setState({applicant: applicant.data}),
            ).catch(error => {
                this.setState({error: true});
            });

            // this.props.get_applicant_detail(this.state.applicant)

        var axios = require('axios');

        var config = {
            method: 'get',
            url: `https://localhost:5001/Cv/${this.props.match.params.id}`,
            headers: {
                'Authorization': `Bearer ${this.props.token} `,

            },


        };
        axios(config)
            .then(function (response) {
                const distance = response.data.data.cvpath;
                   // console.log(response.data.data);
                   this.setState({cv:response.data.data})
                this.setState({cvpath: distance});
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });




        // axios
        //     .get('https://localhost:5001/Cv/GetAll', {
        //
        //     })
        //     .then(response => {
        //         const distance = response.data.cvpath;
        //         // console.log(distance);
        //          this.setState({cv: distance});
        //
        //
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    }


    handle_edit = () => {
        this.props.get_applicant_detail(this.state.applicant.firstName,this.state.applicant.lastName,this.state.applicant.gender,this.state.applicant.contactNum,this.state.applicant.workExperience,this.state.applicant.skills,this.state.applicant.img_url,
            this.state.applicant.bio,this.state.applicant.user_name,this.state.applicant.email,this.state.cv);
        this.props.get_imgurl(this.state.applicant.img_url)
         // this.props.history.push('/editprofile')
         console.log(this.state.cv)

    }

    handle_cv = () => {

        // this.props.history.push('/interviews')

    }


    handle_applied_jobs = () => {
        // console.log(this.state.cv[0].cvUrl)
        this.props.history.push('/joblist')

    }


    render() {

        return (


            <div class="container-fluide">

                <div className="container-fluide">
                    <div className="row">
                        <div className="col-6">

                            <div className="row">

                                <div className="col-sm-2"></div>

                                <div className="col-sm-10 detail">

                                        <div className="col">
                                            <div className="card">
                                                    <div className="card-body">
                                                       <div className="row ">
                                                            <div className="col-sm-1"></div>
                                                            <div className="col-1 pcolor"><AccountBoxIcon></AccountBoxIcon></div>
                                                            <div className="col-4 text1"><h6 className="mb-0"><label>First Name</label></h6>
                                                            </div>

                                                            <div className="col-sm-4 ">{this.state.applicant.firstName}</div>
                                                        </div>
                                                        <hr></hr>


                                                        <div className="row">
                                                            <div className="col-sm-1"></div>
                                                            <div className="col-1 pcolor "><AccountBoxIcon></AccountBoxIcon></div>
                                                            <div className="col-sm-4"><h6 className="mb-0"><label>Last Name</label></h6>
                                                            </div>
                                                            <div className="col-sm-4 ">{this.state.applicant.lastName}</div>
                                                        </div>

                                                        <hr></hr>

                                                        <div className="row">
                                                            <div className="col-sm-1"></div>
                                                            <div className="col-1 pcolor "><WcIcon></WcIcon></div>
                                                            <div className="col-sm-4"><h6 className="mb-0"><label>Gender</label></h6></div>
                                                            <div className="col-sm-4 ">{this.state.applicant.gender}</div>
                                                        </div>

                                                        <hr></hr>

                                                        <div className="row">
                                                            <div className="col-sm-1"></div>
                                                            <div className="col-1 pcolor"><EmailIcon></EmailIcon></div>
                                                            <div className="col-sm-4"><h6 className="mb-0"><label>Email</label></h6></div>
                                                            <div className="col-sm-4 ">{this.state.applicant.email}</div>
                                                        </div>
                                                        <hr></hr>

                                                        <div className="row">

                                                            <div className="col-sm-1"></div>
                                                            <div className="col-1 pcolor"><PhoneAndroidIcon/></div>
                                                            <div className="col-sm-4"><h6 className="mb-0"><label>Phone Number</label></h6>
                                                            </div>
                                                            <div className="col-sm-4 ">{this.state.applicant.contactNum}</div>
                                                        </div>
                                                        <hr></hr>


                                                        <div className="row">
                                                            <div className="col-sm-1"></div>
                                                            <div className="col-1 pcolor "><AccountBoxIcon></AccountBoxIcon></div>
                                                            <div className="col-sm-4"><h6 className="mb-0"><label>Bio</label></h6></div>
                                                            <div className="col-sm-6 ">{this.state.applicant.bio}</div>
                                                        </div>
                                                        <hr></hr>


                                                        <div className="row">
                                                            <div className="col-sm-1"></div>
                                                            <div className="col-1 pcolor "><LaptopIcon></LaptopIcon></div>
                                                            <div className="col-sm-4"><h6 className="mb-0"><label>Skills</label></h6></div>
                                                            <div className="col-sm-4 ">{this.state.applicant.skills}</div>
                                                        </div>
                                                        <hr></hr>


                                                        <div className="row">
                                                            <div className="col-sm-1"></div>
                                                            <div className="col-1 pcolor "><WorkIcon></WorkIcon></div>
                                                            <div className="col-sm-4"><h6 className="mb-0"><label>Work Experience</label>
                                                            </h6></div>
                                                            <div className="col-sm-4 ">{this.state.applicant.workExperience} year</div>
                                                        </div>
                                                        <br/>
                                                        <br/>
                                                        <div className="row">
                                                            <div className="col-sm-1"></div>
                                                            <div className="col-1 pcolor "><WorkIcon></WorkIcon></div>
                                                            <div className="col-sm-4"><h6 className="mb-0"><label>CV</label></h6></div>
                                                            <div className="col-sm-4 ">

                                                                {/*{cv_item}*/}
                                                                <a href={this.state.cvpath} download="awwad.pdf">Click here to
                                                                    view cv</a>


                                                            </div>
                                                        </div>







                                                    </div>
                                            </div>
                                        </div>
                                        </div>



                                </div>


                            </div>




                        <div className="col-6">
                            <div className="row">



                            </div>

                            <div className="row">

                                <div className="col">
                                   <Admin_applied_jobs
                                       ID={this.props.match.params.id}
                                   />

                                </div>
                            </div>
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
        token: state.auth.token,
    }
};

const mapDispatchToProps = dispatch => {
    return {

        get_applicant_id: (id) => dispatch(actions.get_applicant_id(id)),
        get_applicant_detail: (fName,lName,gender,contactNo,workExperience,skills,imgUrl,bio,userName,email,cv) => dispatch(actions.get_applicant_details(fName,lName,gender,contactNo,workExperience,skills,imgUrl,bio,userName,email,cv)),
        get_imgurl: (url) => dispatch(actions.get_imgurl(url)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Userview);