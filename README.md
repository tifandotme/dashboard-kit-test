A React.js application

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Signing In](#signing-in)

## Overview

This app uses `json-server` as a mock API server to serve data to _some_ of the UIs.

Currently these are the available routes:

```
/         (Overview page)
/signin   (Sign In page)
```

Both routes are protected, meaning you can't access the overview page if you're not signed in, and vice versa.

Dark/light mode is available by clicking the toggle button in the header.

## Prerequisites

Ensure that you have **Node.js v20** or above installed on your local machine.

## Installation

1. Install the required packages and dependencies by running the following command:

```bash
npm install
# or using any package manager of your choice (e.g. yarn install)
```

## Running the Application

First, start the mock API server by running the following command:

```bash
npm run serve
```

Then, start the application by running the following command:

```bash
npm run dev
```

> The application will be available at http://localhost:3000 by default.

## Signing In

In the Sign In page, you can use the following credentials to sign in:

- email: admin@example.com
- password: 12345678
