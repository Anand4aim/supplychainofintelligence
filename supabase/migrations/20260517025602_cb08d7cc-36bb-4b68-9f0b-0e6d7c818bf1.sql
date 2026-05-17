
-- Backfill cube_position for articles where functions or all axes are empty
UPDATE live_articles
SET analysis = jsonb_set(
  analysis,
  '{cube_position,functions}',
  '["Product","Strategy","Dev/Eng"]'::jsonb
)
WHERE slug = 'google-personal-intelligence-moat';

UPDATE live_articles
SET analysis = jsonb_set(
  COALESCE(analysis, '{}'::jsonb),
  '{cube_position}',
  '{"functions":["Strategy","Ops","Dev/Eng"],"verticals":["Legal","Horizontal"],"layers":["L5","L6","L7"]}'::jsonb
)
WHERE slug = 'anthropic-legal-stack-commoditizes-vertical-saas'
  AND (analysis->'cube_position' IS NULL OR jsonb_array_length(COALESCE(analysis->'cube_position'->'layers','[]'::jsonb)) = 0);

UPDATE live_articles
SET analysis = jsonb_set(
  COALESCE(analysis, '{}'::jsonb),
  '{cube_position}',
  '{"functions":["Dev/Eng","Ops","Strategy"],"verticals":["Horizontal","Gov"],"layers":["L0","L1","L2"]}'::jsonb
)
WHERE slug = 'anthropic-spacex-compute-infrastructure-deal'
  AND (analysis->'cube_position' IS NULL OR jsonb_array_length(COALESCE(analysis->'cube_position'->'layers','[]'::jsonb)) = 0);

UPDATE live_articles
SET analysis = jsonb_set(
  COALESCE(analysis, '{}'::jsonb),
  '{cube_position}',
  '{"functions":["Strategy","Sales","Dev/Eng","Ops"],"verticals":["Horizontal","SaaS","FinTech"],"layers":["L5","L6","L7","L8"]}'::jsonb
)
WHERE slug = 'openai-moves-to-own-enterprise-stack'
  AND (analysis->'cube_position' IS NULL OR jsonb_array_length(COALESCE(analysis->'cube_position'->'layers','[]'::jsonb)) = 0);
