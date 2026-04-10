const express = require('express');
const db = require('../db');
const router = express.Router();

// GET /api/settings
router.get('/', async (_req, res, next) => {
  try {
    const mcpRows = await db('mcp_settings').select('*').orderBy('id');
    const mcps = {};
    for (const r of mcpRows) {
      mcps[r.tool_id] = r.enabled;
    }
    res.json({ mcps });
  } catch (err) { next(err); }
});

// PUT /api/settings
router.put('/', async (req, res, next) => {
  try {
    const { mcps } = req.body;

    if (mcps && typeof mcps === 'object') {
      for (const [toolId, enabled] of Object.entries(mcps)) {
        await db('mcp_settings')
          .where('tool_id', toolId)
          .update({ enabled: !!enabled });
      }
    }

    // Return updated state
    const mcpRows = await db('mcp_settings').select('*').orderBy('id');
    const result = {};
    for (const r of mcpRows) {
      result[r.tool_id] = r.enabled;
    }
    res.json({ mcps: result });
  } catch (err) { next(err); }
});

module.exports = router;
