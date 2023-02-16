import HomePage from "../../HomePage.tsx";
import { Context } from "../../deps.ts";

const colors: string[] = [];

export const home = (ctx: Context) => {
    ctx.response.status = 200;
    ctx.response.type = 'html';
    ctx.response.body = HomePage({  });
}

export const color = async (ctx: Context) => {
    const newColor = await ctx.request.body().value

    for (const [key, val] of newColor.entries()) {
      colors.push(val);
    }
    
    ctx.response.status = 200;
    ctx.response.type = 'html';
    ctx.response.body = HomePage({ colors });
  }

export const notFound = (ctx: Context) => {
    ctx.response.status = 404;
    ctx.response.body = 'Not Found';
  }