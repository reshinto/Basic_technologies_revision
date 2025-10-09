# Basic Technologies Revision

## Overview
This repository is a living study guide that groups together concise notes, runnable code snippets, and supporting diagrams that cover the software engineering stack end to end. From API backends and frontend frameworks to DevOps, databases, testing, math, and interview prep, every folder contains short explanations or sample projects so you can quickly refresh a topic without digging through long-form documentation.

## What's Inside
- **API/** – Comparisons of REST vs. SOAP, plus framework-focused guides for Express, Flask, and Spring Boot with starter code and walkthroughs.
- **automatedTests/** – Testing concepts and examples to help structure reliable automation.
- **basics/** – CS fundamentals, regex/OOP summaries, and Python concurrency demos for synchronous, asynchronous, and multithreaded HTTP requests.
- **database/** – Notes on relational and NoSQL concepts, normalization, indexing, and query patterns.
- **deployment/** & **devops/** – CI/CD, packaging, infrastructure, and tooling checklists for shipping software.
- **designPatterns/** – Catalogued creational, structural, and behavioral patterns, SOLID principles, and supporting images.
- **frontend/** & **fullstack/** – Angular, React, Chrome extension, and PWA guides, plus end-to-end architecture notes.
- **interviewPrep/**, **math/**, and **machine_learning/** – Quick-reference sheets for algorithms, probability, and ML project workflows.
- **languageSpecific/** – Language-centric cheat sheets capturing syntax tips and ecosystem notes.
- **UMLdiagrams/**, **flowchartsAndUMLdiagrams/**, and **images/** – Visual references for system modeling, component relationships, and study diagrams.
- **others/**, **pre-hooks/**, and **projectManagementTools/** – Miscellaneous knowledge, Git hooks (Python and JavaScript Husky setups), and build tooling primers (Gradle, Maven).

## Key Features
- **Topic-first organization**: Each directory acts as a self-contained refresher with Markdown notes or code that focus on a single discipline, making it easy to jump straight to what you need.
- **Hands-on snippets**: Sample backends (Express TypeScript server configuration, Flask quickstart, Spring Boot notes) and Python concurrency scripts show the concepts in action, so you can clone and experiment locally.
- **Visual learning aids**: Dedicated folders of UML diagrams, flowcharts, and PNG/JPG illustrations reinforce the textual explanations with architecture and algorithm visuals.
- **Career-focused content**: Interview prep drills, math reminders, and machine learning checklists support exam or job-interview practice alongside daily engineering work.
- **Tooling and workflow coverage**: DevOps, deployment, and project management folders capture CI/CD practices, build tools, and hook scripts to streamline engineering processes.

## Getting Started
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Basic_technologies_revision
   ```
2. **Browse by topic** – Open the folder that matches the concept you want to review and read the Markdown notes or diagrams inside.
3. **Follow in-folder instructions** – Many subdirectories include their own README files that dive deeper or outline specific setup steps. Use those instructions when exploring a framework, language, or tool.

## Running the Examples
- **Flask quickstart**: Inside `API/flaskTutorial`, export `FLASK_ENV=development` and `FLASK_APP=app`, then run `flask run` (commands for macOS/Linux and Windows CMD are documented in that folder).
- **Express playground**: Under `API/express`, use the TypeScript snippets as a reference for configuring routes, middleware, and error handling in an Express app.
- **Python concurrency demos**: Execute scripts such as `python basics/multithread_async_examples/python/asyncio_http_requests.py` to compare synchronous vs. asynchronous request performance (ensure dependencies like `requests` are installed).
- **Additional topics**: Framework notes (Angular, React, Spring Boot, etc.), diagrams, and DevOps guides can be reviewed directly in Markdown; follow any per-folder instructions before attempting advanced setups.

## Tips for Study Sessions
- Pair the conceptual folders with their practical counterparts—for example, read `designPatterns/` notes alongside the UML diagrams in `images/` to see patterns illustrated.
- When preparing for interviews, combine `interviewPrep/` drills with the algorithm visuals in `images/` and the math refreshers in `math/`.
- Use `pre-hooks/` and `projectManagementTools/` as templates when configuring automation or build pipelines in your own projects.
