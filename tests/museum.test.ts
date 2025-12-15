import { MuseumRepository } from "../src/repository/museum"
import { AuthRepository } from "../src/repository/auth"
import testFetch from "./fetchTest"

const BASE_URL = "http://localhost:8080"

async function main() {
    const museumRepo = new MuseumRepository(BASE_URL, testFetch)
    const authRepo = new AuthRepository(BASE_URL, testFetch)

    console.log("=== Museum API Test Start ===")

    try {
        //アドミンログイン
        console.log("\n[0] Admin Signin")
        const user = await authRepo.signin({
            email: "admin@example.com",
            password: "adminpassword",
        })
        console.log("Signed in as:", user.email)

        // --- 1. Create ---
        console.log("\n[1] Create Museum")
        const museum = await museumRepo.create({
            name: "Test Museum",
        })
        console.log("Created:", museum)

        // --- 2. Get ---
        console.log("\n[2] Get Museum")
        console.log("Fetched:", await museumRepo.get(museum.id))

        // --- 3. Update ---
        console.log("\n[3] Update Museum")
        console.log("Updated:", await museumRepo.update(museum.id, {
            name: "Updated Museum",
        }))

        // --- 4. Collect ---
        console.log("\n[4] Collect Museum List")
        console.log("List Count:", await museumRepo.collect())

        // --- 5. Delete ---
        console.log("\n[5] Delete Museum")
        await museumRepo.delete(museum.id)
        console.log("Deleted:", museum.id)

        console.log("\n=== ✔ SUCCESS Museum API test completed ===")
    } catch (e) {
        console.error("\n=== ❌ Test Failed ===")
        console.error(e)
    }
}

main()