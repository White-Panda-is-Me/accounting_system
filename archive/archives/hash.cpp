#include <iostream>
#include <sstream>
#include <iomanip>

std::string hash1(std::string str) {
    static uint64_t hash[4] = {0x1387, 0x1387, 0x1387, 0x1387};
    char* c_str = const_cast<char*>(str.c_str());
    std::ostringstream message;
    for (int i = 1;i < 5;i++) {
        while (*c_str){
            hash[i - 1] =  ((uint64_t)(0xF637 * hash[i - 1]) + (uint64_t)(i << *c_str));
            c_str++;
        }
        c_str -= str.length();
        message << std::setw(16) << std::setfill('0') << std::hex << hash[i - 1];
    }
    return message.str();
}

int main(int argc, char** argv) {
    std::string hash = hash1(argv[1]);
    std::cout << hash << std::endl;  
}