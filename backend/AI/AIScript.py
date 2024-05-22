import sys

questions = sys.argv[1]
datasets = sys.argv[2]


import pickle
import csv

  #load model from pickle file
myModel = "./../../backend/AI/p6AIModel10k5e.pkl"
with open(myModel, 'rb') as file:
    model = pickle.load(file)

from transformers import AutoTokenizer, AutoModelForQuestionAnswering

# Load the tokenizer and model
tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased')

#try: model
#except NameError: model = AutoModelForQuestionAnswering.from_pretrained('bert-base-uncased')

import torch

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

#def generateResponse(question, dataset)

context = ''
with open(datasets, newline='') as contextTrue:
  csvPointer = csv.reader(contextTrue)
  for row in csvPointer:
    context = context + ' '.join(row) + ' '

# current context is just as an example
#question = ""
#context = "Discovery \n Main article: Discovery of penicillin \n Sample of penicillium mould presented by Alexander Fleming to Douglas Macleod, 1935 Starting in the late 19th century there had been reports of the antibacterial properties of Penicillium mould, but scientists were unable to discern what process was causing the effect.[76] Scottish physician Alexander Fleming at St. Mary's Hospital in London (now part of Imperial College) was the first to show that Penicillium rubens had antibacterial properties.[77] On 3 September 1928 he observed by chance that fungal contamination of a bacterial culture (Staphylococcus aureus) appeared to kill the bacteria. He confirmed this observation with a new experiment on 28 September 1928.[78][79] He published his experiment in 1929, and called the antibacterial substance (the fungal extract) penicillin.[46] C. J. La Touche identified the fungus as Penicillium rubrum (later reclassified by Charles Thom as P. notatum and P. chrysogenum, but later corrected as P. rubens).[80] Fleming expressed initial optimism that penicillin would be a useful antiseptic, because of its high potency and minimal toxicity in comparison to other antiseptics of the day, and noted its laboratory value in the isolation of Bacillus influenzae (now called Haemophilus influenzae).[81][82] Fleming did not convince anyone that his discovery was important.[81] This was largely because penicillin was so difficult to isolate that its development as a drug seemed impossible. It is speculated that had Fleming been more successful at making other scientists interested in his work, penicillin would possibly have been developed years earlier.[81] The importance of his work has been recognized by the placement of an International Historic Chemical Landmark at the Alexander Fleming Laboratory Museum in London on 19 November 1999.[83]"

# Tokenize the data
inputs = tokenizer(questions, context, return_tensors='pt', max_length=512, truncation=True)

inputs = {k: v.to(device) for k, v in inputs.items()}

# Apply the BERT model
#    with torch.no_grad():  # No need to calculate gradients
output = model(**inputs)

# Get the predicted answer
start_idx = torch.argmax(output.start_logits)
end_idx = torch.argmax(output.end_logits)
predicted_answer = tokenizer.convert_tokens_to_string(tokenizer.convert_ids_to_tokens(inputs['input_ids'][0][start_idx:end_idx + 1]))

#    print("Question: " + question)
#    print("Answer: " + predicted_answer)

#   return predicted_answer



#answer = "Hello, I am stupid dummy AI. "
#answer = generateResponse(questions, datasets)


#print(answer)
print(predicted_answer)
sys.stdout.flush()

