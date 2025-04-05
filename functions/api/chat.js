export async function onRequestPost(context) {
  const { message } = await context.request.json();
  const key = context.env.key;
  const system = context.env.system_prompt;

  const body = {
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: message }
    ]
  };

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const json = await response.json();
  return new Response(json.choices?.[0]?.message?.content || 'Error', {
    headers: { 'Content-Type': 'text/plain' }
  });
}
