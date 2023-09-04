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

<h3>
This is a different version of Dialoqbase with support for multiple users, using Supabase for authentication. I will not be updating this repository frequently. The official repository can be found  <a href="https://github.com/n4ze3m/dialoqbase">here</a>. If you use this repository for commercial purposes, please consider donating to my <a href="https://ko-fi.com/n4ze3m">Ko-fi</a> page or <a href="https://github.com/sponsors/n4ze3m/">GitHub Sponsors</a>.
</h3>

Dialoqbase is an open-source application designed to facilitate the creation of custom chatbots using a personalized knowledge base. The application leverages advanced language models to generate accurate and context-aware responses. Additionally, it utilizes PostgreSQL, a robust relational database management system, for efficient vector search operations and for storing the knowledge base.


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
```

2. You need to create a `.env` file in the `dialoqbase/app/ui` directory. To do so, navigate to the `dialoqbase/app/ui` directory:

```bash
cd dialoqbase/app/ui
```

add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to the `.env` file. You can obtain these values by creating a new project on [Supabase](https://supabase.com/).

3. Now goto the `dialoqbase/docker` directory and create a `.env` file:

```bash
cd ../../docker
```

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

4. Run the docker-compose file:

```bash
docker-compose up -d
```

or

```bash
docker compose up -d
```

5. Open your browser and go to `http://localhost:3000`.

## Optional

I don't care if you use this project for commercial purposes :)) . However, if you want to support me, you can do so by donating to my [Ko-fi](https://ko-fi.com/n4ze3m) page or GitHub Sponsors.

Note that I will not be providing any support for this project. If you want to contribute, feel free to open a pull request on the official repository [here](https://github.com/n4ze3m/dialoqbase).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
