// OpenClaw Nexus Integration Tests
import assert from 'assert';
import http from 'http';

const BASE_URL = 'http://localhost:3000';

async function testHealth() {
  console.log('Testing /health...');
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}/health`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const body = JSON.parse(data);
        assert.strictEqual(res.statusCode, 200);
        assert.strictEqual(body.status, 'ok');
        console.log('✅ Health check passed');
        resolve();
      });
    }).on('error', reject);
  });
}

// TODO: Add more tests for Node Registration and Task Dispatch
async function runTests() {
  try {
    await testHealth();
    console.log('\nAll tests executed.');
  } catch (err) {
    console.error('❌ Tests failed:', err);
    process.exit(1);
  }
}

runTests();
