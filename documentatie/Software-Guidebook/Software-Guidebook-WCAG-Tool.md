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

Nowadays more and more information, utilities and services are offered online via websites and apps. 
Companies, government instances and individuals start to utilize the digital world more and more due to the ease of use and broad audience they can reach. 
For most people, like younger generations and people up to 40-60 years, this is a great trend and happily go along with it. 
For some people however, like older generations, handicapped or people with disabilities, understanding or even using such an app or website might be a difficult thing to do. 
Most websites today aren’t properly programmed/configured to be accessible for everyone. 
A blind person for example, must rely on the text-to-speech functionality to know and understand what content a website contains. 
If a website isn’t programmed correctly for the text-to-speech functionality to work (properly), a blind person simply wouldn’t be able to use the website. 
If a person isn’t able to use mouse and keyboard due to circumstances, would the website be able to utilize voice control to help this person?

These are accessibility issues that occur on a lot of websites and leave users frustrated. 
In the past people with handicaps or disabilities had to adapt to the environment, but in today’s world the digital environment should adapt to these people.

Accessibility analysts evaluate and judge websites based on how accessible they are using the Web Content Accessibility Guidelines (WCAG). 
Using their own knowledge and automated scripts they check the content of pages and create a rapport with issues that were found during the inspection. 
The format of this rapport is rather clunky and obscure making it difficult to use both for the analyst and the receiver.

For this reason, we were asked to create a tool that allows the user to create annotations on a given website/webpage. 
These annotations should link/refer to elements on the website and contain information about any mistakes or improvements that could be made. 
This creates a clear(er) image about the issues that are present on the website. 
In the end the tool should generate a rapport that’s comprehensible and easy to read.



<!--
Intent

A context section should answer the following types of questions:

- What is this software project/product/system all about?
- What is it that's being built?
- How does it fit into the existing environment? (e.g. systems, business processes, etc) 
- Who is using it? (users, roles, actors, personas, etc)
-->

## Functional Overview

What does our system do???
- Create snapshots
- Create annotations linking to html elements on those snapshots
- Contain WACG references in those annotations
- Generate a raport with any issues about a website as a whole
- Accessible as a chrome extension
- Allows the tracking of versions of website pages (Version control?)
- Allows multiple analysts to work on the same page/snapshot together (collaboration)
- Account management

What kind of features/functions are (very) significant?
- Creating snapshots /w version control
- Creating annotations on those snapshots
- Collaboration between analysts

Stakeholders:
- Analyst as main character
- Company (employee) as secondary character

<!--
Intent

This section allows you to summarise what the key functions of the system are. 
It also allows you to make an explicit link between the functional aspects of the system (use cases, user stories, etc) 
and, if they are significant to the architecture, to explain why. 
A functional overview should answer the following types of questions:

- Is it clear what the system actually does?
- Is it clear which features, functions, use cases, user stories, etc are significant to the architecture and why?
- Is it clear who the important users are (roles,actors,personas,etc)and how  the system caters for their needs?
- It is clear that the above has been used to shape and define the architecture?

Alternatively, if your software automates a business process or workflow, a functional view should answer questions like the following:

- Is it clear what the system does from a process perspective?
- What are the major processes and flows of information through the system?
-->


## Quality Attributes

[what is a quality attribute](https://en.wikipedia.org/wiki/List_of_system_quality_attributes)

Usability / Extensibility / Maintainability / Effectiveness / Robustness / Responsiveness

Usability: "Usability can be described as the capacity of a system to provide a condition for its users to perform the tasks safely, effectively, and efficiently while enjoying the experience.[1] In software engineering, usability is the degree to which a software can be used by specified consumers to achieve quantified objectives with effectiveness, efficiency, and satisfaction in a quantified context of use."

Extensibility: "Extensibility is a software engineering and systems design principle that provides for future growth. Extensibility is a measure of the ability to extend a system and the level of effort required to implement the extension. Extensions can be through the addition of new functionality or through modification of existing functionality. The principle provides for enhancements without impairing existing system functions."

Maintainability: "In engineering, maintainability is the ease with which a product can be maintained in order to:

-  correct defects or their cause,
-  Repair or replace faulty or worn-out components without having to replace still working parts,
-  prevent unexpected working conditions,
-  maximize a product's useful life,
-  maximize efficiency, reliability, and safety,
-  meet new requirements,
-  make future maintenance easier, or
-  cope with a changing environment.

In some cases, maintainability involves a system of continuous improvement - learning from the past in order to improve the ability to maintain systems, or improve the reliability of systems based on maintenance experience."

Effectiveness: "Effectiveness is the capability of producing a desired result or the ability to produce desired output. When something is deemed effective, it means it has an intended or expected outcome, or produces a deep, vivid impression."

Robustness: "In computer science, robustness is the ability of a computer system to cope with errors during execution[1][2] and cope with erroneous input.[2] Robustness can encompass many areas of computer science, such as robust programming, robust machine learning, and Robust Security Network. Formal techniques, such as fuzz testing, are essential to showing robustness since this type of testing involves invalid or unexpected inputs. Alternatively, fault injection can be used to test robustness. Various commercial products perform robustness testing of software analysis."

Responsiveness: "Responsiveness as a concept of computer science refers to the specific ability of a system or functional unit to complete assigned tasks within a given time.[1] For example, it would refer to the ability of an artificial intelligence system to understand and carry out its tasks in a timely fashion.[2] It is one of the criteria under the principle of robustness (from a v principle). The other three are observability, recoverability, and task conformance."

<!--
Intent

This section is about summarising the key quality attributes and should answer the following types of questions:

- Is there a clear understanding of the quality attributes that the architecture must satisfy?
- Are the quality attributes SMART (specific, measurable, achievable, relevant and timely)?
- Have quality attributes that are usually taken for granted been explicitly marked as out of scope if they are not needed? 
(e.g. user interface elements will only be presented in English to indicate that multi-language support is not explicitly catered for)
- Are any of the quality attributes unrealistic? (e.g. true 24x7 availability is typically very costly to implement inside many organisations)

In addition, if any of the quality attributes are deemed as architecturally significant and therefore influence the architecture, 
why not make a note of them so that you can refer back to them later in the document.
-->


## Constraints

Available time: 8-9 weeks
project methodology: Scrum
Scrum sprint duration: 2 weeks (3 sprints total)
Programming language: Javascript
Libraries: React, Redux

## Project Methodology
In this project we'll be using Scrum as our framework to develop and deliver our application and products.
We'll be doing daily stand-ups, holding sprint planning, sprint reviews and retrospectives.
The daily stand-up will be used to give the team an moment of time to give each other progress reports, which will give the team an overview on how well the sprint is going.
The Sprint planning and review will be used to start the sprint by determining what functionality/user stories we want to implement this sprint and review the results in the sprint review.
Lastly in the retrospective we'll evalute our team as a whole and as individuals. This is the moment to give complements and constructive feedback. 

## Time & Budget
For this project we've got a 9 week time period to develop the application.
Of these 9 weeks, 6 weeks (3 sprints) will be dedicated to programming and implementing features into the application.

Our budget for this project will be 0, meaning that we'll only use free software & storage in this project.

## Technology
For our application we're obligated to use react redux combined with a node back-end.


<!--
Intent

Constraints are typically imposed upon you but they aren't necessarily 'bad', 
as reducing the number of available options often makes your job designing software easier. 
This section allows you to explicitly summarise the constraints that you're working within and the decisions that have already been made for you.
-->


## Principles

Our principles are all defined in our [Project startup & Definition of Done](../Project Organisatie/Project plan.md)

<!--
Intent

The purpose of this section is to simply make it explicit which principles you are following. 
These could have been explicitly asked for by a stakeholder or they could be principles that you (i.e. the software development team) want to adopt and follow.
-->

## Software Architecture



<!--
Intent

The purpose of this section is to summarise the software architecture of your software system so that the following questions can be answered:

- What does the 'big picture' look like?
- Is there are clear structure?
- Is it clear how the system works from the '30,000 foot view'?
- Does it show the major containers and technology choices?
- Does it show the major components and their interactions?
- What are the key internal interfaces? (e.g. a web service between your web and business tiers)
-->


## External Interfaces

<!--
The purpose of this section is to answer the following types of questions:

- What are the key external interfaces?
- Has each interface been thought about from a technical perspective?
- Has each interface been thought about from a non-technical perspective?
- Who has ownership of the interface?
-->

## Code

Significant aspects of our code:

- React redux
- Redux-toolkit -> Createslice & RTK Query
- Chrome storage?
- Unit tests
- Tailwind?
- Collaboration
- XPath
- Snapshot
- 

<!--
The purpose of the code section is to describe the implementation details for parts of the software system that are important, complex, significant, etc.
For example, I've written about the following for software projects that I've been involved in:

- Generating/rendering HTML: a short description of an in-house framework that was created for generating HTML, including the major classes and concepts.
- Data binding: our approach to updating business objects as the result of HTTP POST requests.
- Multi-page data collection: a short description of an in-house framework we used for building forms that spanned multiple web pages.
- Web MVC: an example usage of the web MVC framework that was being used.
- Security:our approach to using WindowsIdentityFoundation (WIF) for authentication and authorisation.
- Domain model: an overview of the important parts of the domain model.
- Component framework: a short description of the framework that we built to allow components to be reconfigured at runtime.
- Configuration: a short description of the standard component configuration mechanism in use across the codebase.
- Architectural layering: an overview of the layering strategy and the patterns in use to implement it.
- Exceptions and logging: a summary of our approach to exception handling and logging across the various architectural layers.
- Patterns and principles: an explanation of how patterns and principles are implemented.
- etc
-->

## Data

<!--
Intent

The purpose of the data section is to record anything that is important from a data perspective, answering the following types of questions:

- What does the data model look like?
- Where is data stored?
- Who owns the data?
- How much storage space is needed for the data? (e.g. especially if you're dealing with 'big data')
- What are the archiving and back-up strategies?
- Are there any regulatory requirements for the long term archival of business data?
- Likewise for log files and audit trails?
- Are flat files being used for storage? If so, what format is being used?
-->


## Infrastructure Architecture

Chrome extension -> Backend -> cloud storage

<!--
Intent

This section is used to describe the physical/virtual hardware and networks on which the software will be deployed. 
Although, as a software architect, you may not be involved in designing the infrastructure, 
you do need to understand that it's sufficient to enable you to satisfy your goals. 
The purpose of this section is to answer the following types of questions:

- Is there a clear physical architecture?
- What hardware (virtual or physical) does this include across all tiers?
- Does it cater for redundancy, failover and disaster recovery if applicable?
- Is it clear how the chosen hardware components have been sized and selected?
- If multiple servers and sites are used, what are the network links between them?
- Who is responsible for support and maintenance of the infrastructure?
- Are there central teams to look after common infrastructure (e.g. databases, message buses, application servers, networks, routers, switches, load balancers, reverse proxies, internet connections, etc)?
- Who owns the resources?
- Are there sufficient environments for development, testing, acceptance, pre-production, production, etc?
-->


## Deployment



<!--
Intent

This section is used to describe the mapping between the software (e.g. containers) and the infrastructure. 
Sometimes this will be a simple one-to-one mapping (e.g. deploy a web application to a single web server) 
and at other times it will be more complex (e.g. deploy a web application across a number of servers in a server farm). 
This section answers the following types of questions:

- How and where is the software installed and configured?
- Is it clear how the software will be deployed across the infrastructure elements described in the infrastructure architecture section? (e.g. one-to-one mapping, multiple containers per server, etc)
- If this is still to be decided, what are the options and have they been documented?
- Is it understood how memory and CPU will be partitioned between the processes running on a single piece of infrastructure?
- Are any containers and/or components running in an active-active, active-passive, hot-standby, cold-standby, etc formation?
- Has the deployment and rollback strategy been defined?
- What happens in the event of a software or infrastructure failure?
- Is it clear how data is replicated across sites?
-->


## Operation and Support



<!--
Intent

Most systems will be subject to support and operational requirements, particularly around how they are monitored, managed and administered. 
Including a dedicated section in the software guidebook lets you be explicit about how your software will or does support those requirements. 
This section should address the following types of questions:

- Is it clear how the software provides the ability for operation/support teams to monitor and manage the system?
- How is this achieved across all tiers of the architecture?
- How can operational staff diagnose problems?
- Where are errors and information logged? (e.g. log files, Windows Event Log, SMNP, JMX, WMI, custom diagnostics, etc)
- Do configuration changes require a restart?
- Are there any manual house keeping tasks that need to be performed on a regular basis?
- Does old data need to be periodically archived?
-->


## Decision Log

- React redux
- Redux-toolkit -> Createslice & RTK Query
- Chrome storage?
- Unit tests
- Tailwind?
- Collaboration
- XPath
- Snapshot


### XPath vs CSS selectors

When you are programmatically trying to select an element on a web page there are two obvious choices to consider: XPath and CSS selectors. 

To determine which one would be best for our use cases we built two basic prototypes and consulted a few sources. The full report of this research can be read [here](../Spikes/CSS vs XPath/XPath vs CSS selector.md)

The main take-away is that we are going to use XPath since it has a wider range of options in the way it generates selectors. 

<!--
Intent

The purpose of this section is to simply record the major decisions that have been made,
including both the technology choices (e.g. products, frameworks, etc) and the overall architecture 
(e.g. the structure of the software, architectural style, decomposition, patterns, etc). For example:

- Why did you choose technology or framework 'X' over 'Y' and 'Z'?
- How did you do this? Product evaluation or proof of concept?
- Were you forced into making a decision about 'X' based upon corporate policy or enterprise architecture strategies?
- Why did you choose the selected software architecture? What other options did you consider?
- How do you know that the solution satisfies the major non-functional requirements?
- etc
-->
