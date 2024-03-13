import prompts from "prompts"

// import yargs from "yargs"
// prompts.override(yargs.argv)

prompts.override(require("yargs").argv)

;(async () => {
  const example = await prompts({
    type: "text",
    name: "input",
    message: "What's your input?",
  })

  console.log(example.value)
})()
