# JSONata Percipio Exerciser

This allows you to test JSONata expressions against a JSON input structure.
Paste the JSON data into the left hand pane, and type JSONata expressions into the top right pane.
The result will appear below.

The custom Percipio library of JSONata functions is available.

## Running the app locally

- `npm install`
- `npm start`

The app is also available at [try.jsonata.org](http://try.jsonata.org/)

## Running in Docker

Follow the [Official Docker Instructions](https://docs.docker.com/install/) to get setup and running with the Docker Engine.

Follow the [Official Docker Compose Instructions](https://docs.docker.com/compose/install/) to get setup.

> Its recommended to configure Docker to start on boot to ensure docker is running after a system reboot. Instructions can be found on the docker documentation depending on your OS.

### Start JSONata Percipio Exerciser

Now with Docker and Docker Compose installed, create the image and start the container.

```bash
docker-compose up
```
This should start the build of a new image and container using [Nginx](https://hub.docker.com/_/nginx), and then start the container.

You will be able to access the tool at [http://localhost:8080](http://localhost:8080)

> After rebuilding the project you will need to rebuild the image using
> ```bash
> docker-compose build
> ```

## License

MIT © Martin Holden