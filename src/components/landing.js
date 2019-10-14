import React, { Component } from 'react';
import './home.css'


class Landing extends Component {
    render() {
        return (<div className="landing-container">
        <div className="landing-spanall headerrow">Its Project Management Online, 
        Register as a Service Provider to join the network to perform services on Projects to get paid
        </div>
        <div className="landing-spanall bodyrow">
        
        <img src="https://www.goandhireme.com/png/sitemap.png" alt="app.goandhireme.com site map" className="sitemap" /> </div>
        <div className="landing-spanall headerrow"> The Design Process when Creating a Project </div>
        
        
        <div className="landing-spanall bodyrow"> 
        <ol>
        <li>Create the Project. Give it a title, location and define the scope of work. A scope of work is an overview description of the end result. Scope of work answers the question what? </li>
        <li>Create a Sequential step series of milestones to get from where you are to where you want to be at the end of your project. Then it will be up to the service providers to match your expectation which you laid out in your milestones to your service providers. </li>
        <li>Build your Design Team. Use the search bar to find members to add to your project. For each provider, define what their specific role is on the project. Once you save your design team it will send an email notification to you and the person. </li>
        <li>Build a Schedule when you authorize work. The service provider receives the work request and they build a schedule for  their role on your project. When they enter a schedule, they must include  one milestone you created for each work item they enter. They would be entering labor and materials. </li>
        <li>Receive Services. You have authorized schedule and budget and you will receive the services you requested. As the provider, you are responsible for accurately entering your actual costs as they occur identically to what you put into the schedule. You can easily update the schedule and receive authorization prior to including additional costs to your client. It is important to receive authorization prior to performing services if you are going to request invoice. </li>
        <li>Project Closeout. You have received your service. You are happy with  the end result and the price you were able to get using the program and building your project this way. You pay the invoices to complete the project closeout to restore the project balances to $0.00 and the project is done.   </li>
        </ol>
       </div>
        </div>)
    }
}
export default Landing;
