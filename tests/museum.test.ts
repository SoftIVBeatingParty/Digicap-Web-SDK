import { MuseumRepository } from "../src/repository/museum";
import { AuthRepository } from "../src/repository/auth";
import testFetch from "./testFetch";

/** ← ここにテスト対象 API サーバーの URL を入れる */
const BASE_URL = "http://localhost:8080";

async function main() {
    const museumRepo = new MuseumRepository(BASE_URL, testFetch);
    const authRepo = new AuthRepository(BASE_URL, testFetch);

    console.log("=== Museum API Test Start ===");

    try {
        //アドミンログイン
        console.log("\n[0] Admin Signin");
        const adminUser = await authRepo.signin({
            email: "admin@example.com",
            password: "adminpassword",
        })
        console.log("Signed in as:", adminUser.email);
        
        // --- 1. Create ---
        console.log("\n[1] Create Museum");
        const created = await museumRepo.create({
            name: "Test Museum",
            description: "Museum created by SDK test",
        });
        console.log("Created:", created);

        // --- 2. Get ---
        console.log("\n[2] Get Museum");
        const fetched = await museumRepo.get(created.id);
        console.log("Fetched:", fetched);

        // --- 3. Update ---
        console.log("\n[3] Update Museum");
        const updated = await museumRepo.update(created.id, {
            name: "Updated Museum",
        });
        console.log("Updated:", updated);

        // --- 4. Collect ---
        console.log("\n[4] Collect Museum List");
        const list = await museumRepo.collect();
        console.log("List Count:", list.length);

        // --- 5. Delete ---
        console.log("\n[5] Delete Museum");
        await museumRepo.delete(created.id);
        console.log("Deleted:", created.id);

        console.log("\n=== ✔ SUCCESS Museum API test completed ===");
    } catch (e) {
        console.error("\n=== ❌ Test Failed ===");
        console.error(e);
    }
}

main();