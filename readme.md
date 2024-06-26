# Emailer Microservice(Version 0.0.1)

## Overview

This microservice is designed to listen to SQS Queue and send emails. The details are all included in the fetched message payload.

```bash
   EmailPayload = {
      to: string;
      subject: string;
      text: string;
   };

```

## Features

- **Listen To SQS Queue and Send Emails:** Listing to SQS Queue and sending emails.

## Technologies

- **Language/Framework:** [ Typescript, Node.js with Express]
- **Cloud Technology** [ AWS SQS ]
- **Containerization:** [ Docker ]

## Getting Started

### Prerequisites

- Install node v18.19.0

### Installation / Running

1. Clone the repository:

   ```bash
   git clone https://github.com/ShashwotBhattarai/emailer_microservice.git
   ```

2. Install NPM packages:

   ```bash
   npm install
   ```

3. Add env variables:

   ```bash
    EMAILER=
    PASSWORD=
    SERVICE=
    AWS_ACCESS_KEY_ID=
    AWS_SECRET_ACCESS_KEY=
    AWS_REGION=
    S3_BUCKET_NAME=
    SQS_QUEUE_URL=
    ENV=
    PORT=
    ACCESS_CONTROL_ALLOW_ORIGIN_URL=
   ```

4. Run the application:

   ```bash
   npm run start
   ```

5. To test apis:

   ```bash
   Health check API:

   curl --location 'http://localhost:3005/emailer/health' \
   --data ''
   ```

### Test

```bash
   npm run test
```

### Run SonarQube

Please refer the following link to setup SonarQube in your machine.

https://docs.sonarsource.com/sonarqube/latest/try-out-sonarqube/#installing-a-local-instance-of-sonarqube

After a project has been setup you will get a command that looks like below, which one much execute in the root dir of that respective project to run the analysis.

```bash
   sonar-scanner \
   -Dsonar.projectKey={{<PROJECTKEY>}} \
   -Dsonar.sources=. \
   -Dsonar.host.url={{<URL_WHERE_SONARQUBE_IS_HOSTED>}} \
   -Dsonar.token={{<TOKEN FOR THE PROJECT>}}
```
