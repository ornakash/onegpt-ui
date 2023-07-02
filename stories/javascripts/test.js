console.log(JSON.stringify({
    input: 'This is a test chat',
output_type: "json",
multilingual: {
  enabled: true,
},
steps: [
  {
    skill: "bizgpt",
  params: {
      project: "countrypedia-v25",
    cache: true,
  //   metadata: urlParams,
    threshold: 0.7,
    max_items: 10,
    temperature: 0.01,
  }
}
]
}),);

