<div id="top"></div>

<br />
<div align="center">
  <h3 align="center">Hashhub</h3>

  <p align="center">
    Backup hashnode blogs on github instantly!
    <br />
    <a href="https://blog-backup-ten.vercel.app/">View Demo</a>
  </p>
</div>


<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

A quick way to backup your or anyother user's blogs from Hashnode to the github.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![GraphQL][GraphQL]][GraphQL-url]
* [![Tailwind][Tailwind]][Tailwind-url]


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Here is an example of how you can setup and running the project locally.


### Installation

_You need a personal access token from github in order to access github repo._

1. Clone the repo
   ```sh
   git clone https://github.com/HunnySajid/blog-backup.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a `.env.local` file and enter following keys and their values
   ```js
   NEXT_PUBLIC_BASE_URL=https://api.hashnode.com/
   NEXT_PUBLIC_GITHUB_URL=https://api.github.com/graphql
   NEXT_PUBLIC_GITHUB_TOKEN=<YOUR_PERSONAL_ACCESS_TOKEN>
   NEXT_PUBLIC_OWNER_NAME=<GITHUB_USERNAME>
   NEXT_PUBLIC_REPO_NAME=<REPO_TO_STORE_BACKUP>
   NEXT_PUBLIC_BRANCH_NAME=<BRANCH_ON_REPO>
   NEXT_PUBLIC_REPO_WITH_OWNER=$NEXT_PUBLIC_OWNER_NAME/$NEXT_PUBLIC_REPO_NAME
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Add Github App & remove personal access token requirement
- [ ] Add support for other git based orgs 
- [ ] Add Support for medium



<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Hunain Bin Sajid - [@sajid_hunain](https://twitter.com/sajid_hunain) - hunainbinsajid@gmail.com

[![LinkedIn][linkedin-shield]][linkedin-url]

Project Link: [https://github.com/HunnySajid/blog-backup](https://github.com/HunnySajid/blog-backup)

<p align="right">(<a href="#top">back to top</a>)</p>




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/hunainsajid/
[product-screenshot]: public/images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[GraphQL]: https://img.shields.io/badge/Graphql-171E26?style=for-the-badge&logo=graphql&logoColor=D6028F
[GraphQL-url]: https://graphql.org/
[Tailwind]: https://img.shields.io/badge/Tailwind-0A2236?style=for-the-badge&logo=tailwindcss&logoColor=0898B1
[Tailwind-url]: https://tailwindcss.com/