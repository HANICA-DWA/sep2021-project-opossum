#  SOFTWARE GUIDBOOK WCAG TOOL

# Table of Contents
1. [Context](#context)
2. [Functional Overview](#functional-overview)
3. [Quality Attributes](#quality-attributes)
4. [Constraints](#constraints)
5. [Principles](#principles)
6. [Software Architecture](#software-architecture)
7. [External Interfaces](#external-interfaces)
8. [Code](#code)
9. [Data](#data)
10. [Infrastructure Architecture](#infrastructure-architecture)
11. [Deployment](#deployment)
12. [Operation and Support](#operation-and-support)
13. [Desision Log](#desision-log)


## Context

Nowadays more and more information, utilities, companies and government digitalize themselves by having websites or apps that fulfill a purpose.
For many of the younger generations this is an absolute blessing and happily go along with the trend.
For some people however, older generations, handicapped or people with disabilities, understanding or even using such an app or website might be a difficult thing to do.
That is because most websites today are still not properly programmed and therefore not accessible for these people.  
How should a blind person navigate and use a website when the text-to-speech functionality isn't reading the content properly because CSS changed the layout.
Is the website able to navigate a person when he/she cannot use mouse and keyboard and has to rely on voice control?

Because of these issues that occur on most websites, accesibility analists evaluate and judge websites based on how accessible they are using the Web Content Accessibility Guidelines (WCAG) requirements.
Afterwards they send the company a report with any issues they found and a score.


As of currently there isn't a tool available that allows analists to create annotations on a website.
That's what we will be creating.

We are going to create a chrome plug-in that allows analists to create annotations directly onto a website.
When an analist sees something on the website that doens't follow the WCAG standards, they can select that element on the website
and create an annotation attached to that element. That way it's easy to see which elements on a page need improvement.


<!--
Intent

A context section should answer the following types of questions:

� What is this software project/product/system all about?
� What is it that�s being built?
� How does it fit into the existing environment? (e.g. systems, business processes, etc) 
� Who is using it? (users, roles, actors, personas, etc)
-->

## Functional Overview



<!--
Intent

This section allows you to summarise what the key functions of the system are. 
It also allows you to make an explicit link between the functional aspects of the system (use cases, user stories, etc) 
and, if they are significant to the architecture, to explain why. 
A functional overview should answer the following types of questions:

� Is it clear what the system actually does?
� Is it clear which features, functions, use cases, user stories, etc are significant to the architecture and why?
� Is it clear who the important users are (roles,actors,personas,etc)and how  the system caters for their needs?
� It is clear that the above has been used to shape and define the architecture?

Alternatively, if your software automates a business process or workflow, a functional view should answer questions like the following:

� Is it clear what the system does from a process perspective?
� What are the major processes and flows of information through the system?
-->


## Quality Attributes

<!--
Intent

This section is about summarising the key quality attributes and should answer the following types of questions:

� Is there a clear understanding of the quality attributes that the architecture must satisfy?
� Are the quality attributes SMART (specific, measurable, achievable, relevant and timely)?
� Have quality attributes that are usually taken for granted been explicitly marked as out of scope if they are not needed? 
(e.g. �user interface elements will only be presented in English� to indicate that multi-language support is not explicitly catered for)
� Are any of the quality attributes unrealistic? (e.g. true 24x7 availability is typically very costly to implement inside many organisations)

In addition, if any of the quality attributes are deemed as �architecturally significant� and therefore influence the architecture, 
why not make a note of them so that you can refer back to them later in the document.
-->


## Constraints

<!--
Intent

Constraints are typically imposed upon you but they aren�t necessarily �bad�, 
as reducing the number of available options often makes your job designing software easier. 
This section allows you to explicitly summarise the constraints that you�re working within and the decisions that have already been made for you.
-->


## Principles

<!--
Intent

The purpose of this section is to simply make it explicit which principles you are following. 
These could have been explicitly asked for by a stakeholder or they could be principles that you (i.e. the software development team) want to adopt and follow.
-->

## Software Architecture

<!--
Intent

The purpose of this section is to summarise the software architecture of your software system so that the following questions can be answered:

� What does the �big picture� look like?
� Is there are clear structure?
� Is it clear how the system works from the �30,000 foot view�?
� Does it show the major containers and technology choices?
� Does it show the major components and their interactions?
� What are the key internal interfaces? (e.g. a web service between your web and business tiers)
-->


## External Interfaces

<!--
The purpose of this section is to answer the following types of questions:

� What are the key external interfaces?
� Has each interface been thought about from a technical perspective?
� Has each interface been thought about from a non-technical perspective? � Who has ownership of the interface?
-->

## Code

<!--
The purpose of the code section is to describe the implementation details for parts of the software system that are important, complex, significant, etc.
For example, I�ve written about the following for software projects that I�ve been involved in:

� Generating/rendering HTML: a short description of an in-house framework that was created for generating HTML, including the major classes and concepts.
� Data binding: our approach to updating business objects as the result of HTTP POST requests.
� Multi-page data collection: a short description of an in-house framework we used for building forms that spanned multiple web pages.
� Web MVC: an example usage of the web MVC framework that was being used.
� Security:our approach to using WindowsIdentityFoundation (WIF) for authentication and authorisation.
� Domain model: an overview of the important parts of the domain model.
� Component framework: a short description of the framework that we built to allow components to be reconfigured at runtime.
� Configuration: a short description of the standard component configuration mechanism in use across the codebase.
� Architectural layering: an overview of the layering strategy and the patterns in use to implement it.
� Exceptions and logging: a summary of our approach to exception handling and logging across the various architectural layers.
� Patterns and principles: an explanation of how patterns and principles are implemented.
� etc
-->

## Data

<!--
Intent

The purpose of the data section is to record anything that is important from a data perspective, answering the following types of questions:

� What does the data model look like?
� Where is data stored?
� Who owns the data?
� How much storage space is needed for the data? (e.g. especially if you�re dealing with �big data�)
� What are the archiving and back-up strategies?
� Are there any regulatory requirements for the long term archival of business data?
� Likewise for log files and audit trails?
� Are flat files being used for storage? If so, what format is being used?
-->


## Infrastructure Architecture

<!--
Intent

This section is used to describe the physical/virtual hardware and networks on which the software will be deployed. 
Although, as a software architect, you may not be involved in designing the infrastructure, 
you do need to understand that it�s sufficient to enable you to satisfy your goals. 
The purpose of this section is to answer the following types of questions:

� Is there a clear physical architecture?
� What hardware (virtual or physical) does this include across all tiers?
� Does it cater for redundancy, failover and disaster recovery if applicable?
� Is it clear how the chosen hardware components have been sized and selected?
� If multiple servers and sites are used, what are the network links between them?
� Who is responsible for support and maintenance of the infrastructure?
� Are there central teams to look after common infrastructure (e.g. databases, message buses, application servers, networks, routers, switches, load balancers, reverse proxies, internet connections, etc)?
� Who owns the resources?
� Are there sufficient environments for development, testing, acceptance, pre-production, production, etc?
-->


## Deployment

<!--
Intent

This section is used to describe the mapping between the software (e.g. containers) and the infrastructure. 
Sometimes this will be a simple one-to-one mapping (e.g. deploy a web application to a single web server) 
and at other times it will be more complex (e.g. deploy a web application across a number of servers in a server farm). 
This section answers the following types of questions:

� How and where is the software installed and configured?
� Is it clear how the software will be deployed across the infrastructure elements described in the infrastructure architecture section? (e.g. one-to-one mapping, multiple containers per server, etc)
� If this is still to be decided, what are the options and have they been documented?
� Is it understood how memory and CPU will be partitioned between the processes running on a single piece of infrastructure?
� Are any containers and/or components running in an active-active, active-passive, hot-standby, cold-standby, etc formation?
� Has the deployment and rollback strategy been defined?
� What happens in the event of a software or infrastructure failure?
� Is it clear how data is replicated across sites?
-->


## Operation and Support

<!--
Intent

Most systems will be subject to support and operational requirements, particularly around how they are monitored, managed and administered. 
Including a dedicated section in the software guidebook lets you be explicit about how your software will or does support those requirements. 
This section should address the following types of questions:

� Is it clear how the software provides the ability for operation/support teams to monitor and manage the system?
� How is this achieved across all tiers of the architecture?
� How can operational staff diagnose problems?
� Where are errors and information logged? (e.g. log files, Windows Event Log, SMNP, JMX, WMI, custom diagnostics, etc)
� Do configuration changes require a restart?
� Are there any manual housekeeping tasks that need to be performed on a regular basis?
� Does old data need to be periodically archived?
-->


## Decision Log

<!--
Intent

The purpose of this section is to simply record the major decisions that have been made,
including both the technology choices (e.g. products, frameworks, etc) and the overall architecture 
(e.g. the structure of the software, architectural style, decomposition, patterns, etc). For example:

� Why did you choose technology or framework �X� over �Y� and �Z�?
� How did you do this? Product evaluation or proof of concept?
� Were you forced into making a decision about �X� based upon corporate policy or enterprise architecture strategies?
� Why did you choose the selected software architecture? What other options did you consider?
� How do you know that the solution satisfies the major non-functional requirements?
� etc
-->