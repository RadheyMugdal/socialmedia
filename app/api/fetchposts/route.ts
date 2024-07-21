import dbConnect from "@/lib/dbConnect";
import { PostModel } from "@/models/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const params=req.nextUrl.searchParams;
    const limit=parseInt(params.get('limit') as string);
    const page=parseInt(params.get('page') as string);
    const userId=params.get('userId');
    await dbConnect()
        const posts = await PostModel.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "owner",
                    foreignField: "_id",
                    as: "owner"
                }
            },
            {
                $unwind: "$owner" // Unwind the likes array
            },
            {
                $lookup: {
                    from: "likes",
                    localField: "likes",
                    foreignField: "_id",
                    as: "likes" // Rename the result array as "likes"
                }
            },

            {
                $match: {
                    "likes.user_id": { $nin: [new  mongoose.Types.ObjectId(userId as string)] }, // User has not liked the post
                    "owner._id": { $ne: new mongoose.Types.ObjectId(userId as string) } // Not the owner's own post
                }
            },
            {
                $skip: (page - 1) * limit
            },
            {
                $limit: limit
            }
        ]);

        console.log(posts); // Check if the posts are retrieved properly
        return NextResponse.json({ message: "Posts fetched", data: posts, success: true }, { status: 200 });

}

{
    "title":"Twosum",
    "description":" Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. <br/> <br/> You may assume that each input would have <b>exactly one solution</b> exactly one solution, and you may not use the same element twice. <br/> <br/> You can return the answer in any order.",
    "problem_no":1,
    "difficulty":"easy",
    "tags":["array","easy"],
    "constraints":[],
   "test_cases":[
    {
        "input":"[2, 7, 11, 15]",
        "target":"9",
        "expected_output":"[0, 1]"
    },
    {
        "input":"[3, 2, 4]",
        "target":"6",
        "expected_output":"[1, 2]"
    },
    {
        "input":"[3, 3]",
        "target":"6",
        "expected_output":"[0, 1]"
    }

   ],
   "starter_code":{
    "c++":"#include <iostream>\n#include <vector>\n#include <unordered_map>\n\nclass Solution {\npublic:\n    std::vector<int> twoSum(std::vector<int>& nums, int target) {\n        std::unordered_map<int, int> hash_map;\n        for (int i = 0; i < nums.size(); i++) {\n            int complement = target - nums[i];\n            if (hash_map.find(complement) != hash_map.end()) {\n                return {hash_map[complement], i};\n            }\n            hash_map[nums[i]] = i;\n        }\n        throw std::invalid_argument(\"No two sum solution\");\n    }\n};",
    "java":"class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[]{map.get(complement), i};\n            }\n            map.put(nums[i], i);\n        }\n        throw new IllegalArgumentException(\"No two sum solution\");\n    }\n}",
    "javascript":"class Solution {\n    twoSum(nums, target) {\n        const map = new Map();\n        for (let i = 0; i < nums.length; i++) {\n            const complement = target - nums[i];\n            if (map.has(complement)) {\n                return [map.get(complement), i];\n            }\n            map.set(nums[i], i);\n        }\n        throw new Error(\"No two sum solution\");\n    }\n}",
    "python":"class Solution:\n    def twoSum(self, nums, target):\n        '''\n        :type nums: List[int]\n        :type target: int\n        :rtype: List[int]\n        '''\n        hash_map = {}\n        for i, num in enumerate(nums):\n            complement = target - num\n            if complement in hash_map:\n                return [hash_map[complement], i]\n            hash_map[num] = i\n        raise ValueError(\"No two sum solution\")"



   },
   "test_code":{
    "c++":"int main() { Solution solution;\n\n// Test cases\nstd::vector<int> nums1 = {2, 7, 11, 15};\nint target1 = 9;\nstd::vector<int> expected1 = {0, 1};\nstd::vector<int> result1 = solution.twoSum(nums1, target1);\nstd::cout << \"Test 1: Expected: \" << expected1[0] << \",\" << expected1[1] << \", Actual: \" << result1[0] << \",\" << result1[1] << std::endl;\n\nstd::vector<int> nums2 = {3, 2, 4};\nint target2 = 6;\nstd::vector<int> expected2 = {1, 2};\nstd::vector<int> result2 = solution.twoSum(nums2, target2);\nstd::cout << \"Test 2: Expected: \" << expected2[0] << \",\" << expected2[1] << \", Actual: \" << result2[0] << \",\" << result2[1] << std::endl;\n\nstd::vector<int> nums3 = {3, 3};\nint target3 = 6;\nstd::vector<int> expected3 = {0, 1};\nstd::vector<int> result3 = solution.twoSum(nums3, target3);\nstd::cout << \"Test 3: Expected: \" << expected3[0] << \",\" << expected3[1] << \", Actual: \" << result3[0] << \",\" << result3[1] << std::endl;\n\nreturn 0;\n}"
,
    "java":"import java.util.Arrays;\nimport java.util.HashMap;\nimport java.util.Map;\n\n public class SolutionTest {\n    public static void main(String[] args) {\n        Solution solution = new Solution();\n\n        // Test cases\n        int[] nums1 = {2, 7, 11, 15};\n        int target1 = 9;\n        int[] expected1 = {0, 1};\n        int[] result1 = solution.twoSum(nums1, target1);\n        System.out.println(\"Test 1: \" + formatResult(expected1, result1));\n\n        int[] nums2 = {3, 2, 4};\n        int target2 = 6;\n        int[] expected2 = {1, 2};\n        int[] result2 = solution.twoSum(nums2, target2);\n        System.out.println(\"Test 2: \" + formatResult(expected2, result2));\n\n        int[] nums3 = {3, 3};\n        int target3 = 6;\n        int[] expected3 = {0, 1};\n        int[] result3 = solution.twoSum(nums3, target3);\n        System.out.println(\"Test 3: \" + formatResult(expected3, result3));\n    }\n\n    // Helper method to compare two arrays\n    public static String formatResult(int[] expected, int[] actual) {\n        return \"Expected: \" + Arrays.toString(expected) + \", Actual: \" + Arrays.toString(actual);\n    }\n}",
    "python":"# Test cases\nsolution = Solution()\n\nnums1 = [2, 7, 11, 15]\ntarget1 = 9\nexpected1 = [0, 1]\nresult1 = solution.twoSum(nums1, target1)\nprint(\"Test 1: Expected:\", expected1, \", Actual:\", result1)\n\nnums2 = [3, 2, 4]\ntarget2 = 6\nexpected2 = [1, 2]\nresult2 = solution.twoSum(nums2, target2)\nprint(\"Test 2: Expected:\", expected2, \", Actual:\", result2)\n\nnums3 = [3, 3]\ntarget3 = 6\nexpected3 = [0, 1]\nresult3 = solution.twoSum(nums3, target3)\nprint(\"Test 3: Expected:\", expected3, \", Actual:\", result3)",
    "javascript":"const solution = new Solution();\n\nconst nums1 = [2, 7, 11, 15];\nconst target1 = 9;\nconst expected1 = [0, 1];\nconst result1 = solution.twoSum(nums1, target1);\nconsole.log(\"Test 1: Expected:\", expected1, \", Actual:\", result1);\n\nconst nums2 = [3, 2, 4];\nconst target2 = 6;\nconst expected2 = [1, 2];\nconst result2 = solution.twoSum(nums2, target2);\nconsole.log(\"Test 2: Expected:\", expected2, \", Actual:\", result2);\n\nconst nums3 = [3, 3];\nconst target3 = 6;\nconst expected3 = [0, 1];\nconst result3 = solution.twoSum(nums3, target3);\nconsole.log(\"Test 3: Expected:\", expected3, \", Actual:\", result3);"


   }
}


 <div className='mt-8'>
          <h2>Example 1:</h2>
          <div className=' flex flex-col'>
            <div className=' border-l    border-white'>
              <div className=' ml-4 '>
                <p><span className=' font-bold mt-2'>Input:</span></p>
                <p><span className=' font-bold mt-2'>Output:</span></p>
              </div>
            </div>
            
          </div>
        </div>
        {/* example box */}
        <div className='mt-8'>
          <h2>Example 2:</h2>
          <div className=' flex flex-col'>
            <div className=' border-l    border-white'>
              <div className=' ml-4 '>
                <p><span className=' font-bold mt-2'>Input:</span></p>
                <p><span className=' font-bold mt-2'>Output:</span></p>
              </div>
            </div>
            
          </div>
        </div>
        {/* example box */}
        <div className=' mt-8'>
          <h2>Example 3:</h2>
          <div className=' flex flex-col'>
            <div className=' border-l    border-white'>
              <div className=' ml-4 '>
                <p><span className=' font-bold mt-2'>Input: </span><span className=' text-gray-300'>nums = [2,7,11,15], target = 9</span></p>
                <p><span className=' font-bold mt-2'>Output: </span><span>[0,1]</span></p>
              </div>
            </div>
            
          </div>
        </div>
