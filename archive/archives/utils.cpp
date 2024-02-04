#include "utils.h"

std::string stringToHex(const std::string& input) {
    std::ostringstream hexStream;
    
    for (char ch : input) {
        hexStream << std::hex << std::setw(2) << std::setfill('0') << static_cast<int>(static_cast<unsigned char>(ch));
    }

    return hexStream.str();
}