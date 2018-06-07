# node-react-ml-states
Node + React client for getting a tree of states/cities/neighborhoods from the Mercado Libre public APIs.

## Usage

Just run the server via:
`yarn dev`

The react application runs on http://locahost:3000 and the node server runs on http://locahost:8081/, but you won't be using that one directly.

## Requirements

You'll need node, npm, react and yarn.

Execute `yarn` on the root folder to download and solve all dependency issues.


## React components

The tree component is provided by https://ant.design/components/tree/


## Some considerations

Not all of the cities have neighborhoods assigned to them, and the APIs won't return any values. To see a full fledged example, check the "Rio de Janeiro" or the "Rio Grande do Sul" states.