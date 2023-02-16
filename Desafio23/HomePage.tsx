import { React, ReactDOMServer } from "./deps.ts"

const colors: string[] = [];

const Container = (props: any) => (
    props.colors.map(color => <li style={{color:color}}>{color}</li>)
)

export default (props: any) => `<!DOCTYPE html>
${
    ReactDOMServer.renderToString(
        <html style={{backgroundColor: 'black'}}>
            <h1 style={{color: 'white'}}>Insert color name</h1>
            <form action="/" method="post">
                <input type="text" id="color" name="color" />
                <button type="submit" value="Submit">Send</button>
            </form>
            <ul>
                <Container {...props} />
            </ul>
        </html>
    )
}
`