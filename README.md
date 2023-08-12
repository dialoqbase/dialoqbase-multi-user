<h1 align="center">⚡Dialoqbase ⚡</h1>
<p align="center">
 Create chatbots with ease
</p>

<div align="center"> 
  
  [![Join dialoqbase #welcome](https://img.shields.io/badge/discord-join%20chat-blue.svg)](https://discord.gg/SPE3npH7Wu)
  [![Build Status](https://github.com/n4ze3m/dialoqbase/actions/workflows/build.yml/badge.svg)](https://github.com/n4ze3m/dialoqbase/actions/workflows/build.yml)
  [![License: MIT](https://img.shields.io/github/license/n4ze3m/dialoqbase)](https://github.com/n4ze3m/dialoqbase/blob/master/LICENSE)
</div>

## Important

<h1>
This is a demo version of Dialoqbase with support for multiple users, using Supabase for authentication. I will not be updating this repository any further. The official repository can be found  <a href="https://github.com/n4ze3m/dialoqbase">here</a>.
</h1>


Dialoqbase is an open-source application designed to facilitate the creation of custom chatbots using a personalized knowledge base. The application leverages advanced language models to generate accurate and context-aware responses. Additionally, it utilizes PostgreSQL, a robust relational database management system, for efficient vector search operations and for storing the knowledge base.

> **Warning**
> This project is a side project and is still under development. Use it at your own risk

Here's a demo of how it works (v0.0.1):

<div align="center">

[![DialoqBase Demo](https://img.youtube.com/vi/Kktfs8JI4yI/0.jpg)](https://www.youtube.com/watch?v=Kktfs8JI4yI)
</div>

Want to check more demo videos? Follow me on [Twitter](https://twitter.com/n4ze3m) or [BlueSky](https://bsky.app/profile/n4ze3m.com) for more updates.

## Quick Deployments


## Installation

1. Clone the repository and navigate to the docker directory:

```bash
git clone https://github.com/n4ze3m/dialoqbase.git
cd dialoqbase/docker
```

2. Edit the `.env` file and set the following environment variables:

- On Linux:

```bash
nano .env
```

or

```bash
vim .env
```

- On Windows:

```bash
notepad .env
```

Set the `OPENAI_API_KEY` variable to your OpenAI API key. You can obtain an API key [here](https://platform.openai.com/account/api-keys).
Set the `SUPABASE_URL` and `SUPABASE_ANON_KEY` variables to your Supabase URL and Supabase Anon Key. You can obtain these values by creating a new project on [Supabase](https://supabase.com/).

3. Run the docker-compose file:

```bash
docker-compose up -d
```

or

```bash
docker compose up -d
```

4. Open your browser and go to `http://localhost:3000`.



## Optional

I don't care if you use this project for commercial purposes or not. However, if you want to support me, you can do so by donating to my [Ko-fi](https://ko-fi.com/n4ze3m) page or GitHub Sponsors. 

Note that I will not be providing any support for this project. If you want to contribute, feel free to open a pull request.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
