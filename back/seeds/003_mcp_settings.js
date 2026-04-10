exports.seed = async function (knex) {
  await knex('mcp_settings').del();

  await knex('mcp_settings').insert([
    { tool_id: 'claude',     enabled: true  },
    { tool_id: 'canva',      enabled: true  },
    { tool_id: 'claap',      enabled: true  },
    { tool_id: 'slack',      enabled: true  },
    { tool_id: 'notion',     enabled: true  },
    { tool_id: 'hubspot',    enabled: true  },
    { tool_id: 'salesforce', enabled: false },
    { tool_id: 'modjo',      enabled: false },
    { tool_id: 'gong',       enabled: false },
    { tool_id: 'teams',      enabled: false },
    { tool_id: 'jira',       enabled: false },
  ]);
};
